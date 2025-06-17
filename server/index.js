const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const fs = require("fs");
const http = require("http");
const dotenv = require("dotenv");
const { Readable } = require("stream");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const { AssemblyAI } = require("assemblyai");
// const { GoogleGenAI } = require("@google/genai");
const { chatSession } = require("./lib/gemini");
const { title } = require("process");

const app = express();
app.use(cors());
dotenv.config();
const server = http.createServer(app);

const aai = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
const params = { key: process.env.GEMINI_API_KEY };

// // Set axios default headers
// axios.defaults.headers.common["origin"] = 'https://opal-express-gc8f.onrender.com';
// axios.defaults.headers.common["Content-Type"] = "application/json";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const uploadDir = path.join(__dirname, "temp_upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Store chunks per socket connection
const socketChunks = new Map();

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socketChunks.set(socket.id, []);

  socket.emit("connected");

  socket.on("video-chunks", async (data) => {
    try {
      console.log("Receiving video chunk for:", data.filename);

      const chunks = socketChunks.get(socket.id);
      chunks.push(data.chunks);

      const filePath = path.join(uploadDir, data.filename);
      const writeStream = fs.createWriteStream(filePath);

      const videoBlob = new Blob(chunks, {
        type: "video/webm; codecs=vp9",
      });

      const buffer = Buffer.from(await videoBlob.arrayBuffer());
      const readStream = Readable.from(buffer);

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("Chunk saved for:", data.filename);
      });

      writeStream.on("error", (error) => {
        console.error("Error saving chunk:", error);
        socket.emit("upload-error", { message: "Failed to save video chunk" });
      });
    } catch (error) {
      console.error("Error processing video chunk:", error);
      socket.emit("upload-error", { message: "Failed to process video chunk" });
    }
  });

  socket.on("process-video", async (data) => {
    try {
      console.log("Processing video:", data.filename);
      socketChunks.set(socket.id, []); // Clear chunks

      const filePath = path.join(uploadDir, data.filename);

      // Verify file exists
      if (!fs.existsSync(filePath)) {
        throw new Error("Video file not found");
      }

      // Start processing
      console.log(data.userId);
      const processing = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/processing`,
        { filename: data.filename }
      );

      if (processing.data.status !== 200) {
        throw new Error("Failed to create processing file");
      }

      // Upload : Cloudinary
      const cloudinaryUpload = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "clipiq",
          public_id: data.filename,
        },
        async (error, result) => {
          try {
            if (error) {
              throw error;
            }

            console.log("Video uploaded to Cloudinary:", result.secure_url);

            if (processing.data.plan === "PRO") {
              const transcript = await aai.transcripts.transcribe({
                audio: result.secure_url, // cloudinary video url
                speech_model: "universal", // you can use 'nova' too if preferred
                language_code: "en", // or use auto detection
              });

              console.log("Transcript:", transcript.text);

              if (transcript) {
                const payload = {
                  contents: [
                    {
                      parts: [
                        {
                          text: `You are going to generate a title and a nice description using the speech to text transcription provided -transcription(${transcript}) and then return it in the strictly  json format with "title" and "description" `,
                        },
                      ],
                    },
                  ],
                };

                try {
                  const response = await axios.post(url, payload, {
                    params,
                    headers: { "Content-Type": "application/json" },
                  });
                  const content =
                    response.data.candidates[0].content.parts[0].text;
                  console.log("💬 Gemini Output:", content);
                  // return response.data;
                } catch (err) {
                  console.error(
                    "❌ Gemini error:",
                    err.response?.data || err.message
                  );
                  throw err;
                }
              }
            }
            // Complete processing
            const stopProcessing = await axios.post(
              `${process.env.NEXT_API_HOST}recording/${data.userId}/complete`,
              {
                filename: result.secure_url,
                transcript: transcript,
                title: title,
                description: description,
              }
            );

            if (stopProcessing.data.status !== 200) {
              throw new Error("Failed to complete processing");
            }

            // Clean up
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Deleted file:", data.filename);
              }
            });
          } catch (error) {
            console.error("Error in Cloudinary upload callback:", error);
          }
        }
      );

      fs.createReadStream(filePath).pipe(cloudinaryUpload);
    } catch (error) {
      console.error("Error processing video:");
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    socketChunks.delete(socket.id); // Clean up chunks
  });
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`🟢 Server listening on port ${PORT}`);
});
