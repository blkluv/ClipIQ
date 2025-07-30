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
const multer = require("multer");
const { AssemblyAI } = require("assemblyai");

const app = express();
app.use(cors());
dotenv.config();
const server = http.createServer(app);

const aai = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

const uploadDir = path.join(__dirname, "temp_upload");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//multer stoage
const upload = multer({ dest: uploadDir });

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;
const params = { key: process.env.GEMINI_API_KEY };

//  axios default headers
// axios.defaults.headers.common["origin"] = 'https://{}.onrender.com';
// axios.defaults.headers.common["Content-Type"] = "application/json";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    //Uploaded file info from Multer:
    console.log("End Point hit");
    const { filename: tempName, originalname } = req.file;
    const filePath = path.join(uploadDir, tempName);

    //Grabing any metadata from the form or headers:
    const userId = req.body.userId;

    // “processing” has started:
    const processing = await axios.post(
      `${process.env.NEXT_API_HOST}api/recording/${userId}/processing`,
      { filename: originalname }
    );
    console.log("→ processing.data:", processing.data);

    if (processing.data.status !== 200) {
      console.error(
        "unexpected processing.data.status:",
        processing.data.status
      );
      throw new Error("Failed to create processing file");
    }

    // 4) Pipe into Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "clipiq",
        public_id: path.parse(originalname).name,
      },
      async (error, result) => {
        if (error) throw error;
        const videoUrl = result.secure_url;

        console.log("Video uploaded to Cloudinary:", result.secure_url);

        let transcriptText = "";
        let generatedTitle = "Untitled Video";
        let generatedDescription = "No description";

        if (processing.data.plan === "PRO") {
          const transcript = await aai.transcripts.transcribe({
            audio: result.secure_url, // cloudinary video url
            speech_model: "universal", // you can use 'nova' too if preferred
            language_code: "en", // or use auto detection
          });
          transcriptText = transcript.text || "";

          console.log("Transcript:", transcript.text);

          if (transcript) {
            const payload = {
              contents: [
                {
                  parts: [
                    {
                      text: `You are going to generate a title and a nice description using the speech to text transcription provided -transcription(${transcriptText}) and then return it in the strictly  json format with "title" and "description" `,
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
              const content = response.data.candidates[0].content.parts[0].text;
              console.log("💬 Gemini Output:", content);
              let jsonString = content.trim();

              if (jsonString.startsWith("```json")) {
                jsonString = jsonString
                  .replace(/^```json/, "")
                  .replace(/```$/, "")
                  .trim();
              }

              try {
                const parsed = JSON.parse(jsonString);

                generatedTitle = parsed.title;
                generatedDescription = parsed.description;
                // Now you can use generatedTitle and generatedDescription
                console.log("Title:", generatedTitle);
                console.log("Description:", generatedDescription);
              } catch (err) {
                console.error("Failed to parse Gemini output:", err);
              }
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

        const stopProcessing = await axios.post(
          `${process.env.NEXT_API_HOST}api//recording/${userId}/complete`,
          {
            filename: originalname,
            videoUrl: videoUrl,
            transcript: transcriptText,
            title: generatedTitle,
            description: generatedDescription,
          }
        );
        if (stopProcessing.data.status !== 200) {
          throw new Error("Failed to complete processing");
        }

        fs.unlink(filePath, (err) => {
          if (err) console.error("cleanup err:", err);
        });

        res.json({ status: 200, url: videoUrl });
      }
    );
    fs.createReadStream(filePath).pipe(uploadStream);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ status: 500, message: "Upload failed" });
  }
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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
        `${process.env.NEXT_API_HOST}api/recording/${data.userId}/processing`,
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

            let transcriptText = "";
            let generatedTitle = "Untitled Video";
            let generatedDescription = "No description";
            if (processing.data.plan === "PRO") {
              const transcript = await aai.transcripts.transcribe({
                audio: result.secure_url, // cloudinary video url
                speech_model: "universal", // you can use 'nova' too if preferred
                language_code: "en", // or use auto detection
              });

              console.log("Transcript:", transcript.text);
              transcriptText = transcript.text || "";
              if (transcript) {
                const payload = {
                  contents: [
                    {
                      parts: [
                        {
                          text: `You are going to generate a title and a nice description using the speech to text transcription provided -transcription(${transcriptText}) and then return it in the strictly  json format with "title" and "description" `,
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
            let jsonString = content.trim();

            if (jsonString.startsWith("```json")) {
              jsonString = jsonString
                .replace(/^```json/, "")
                .replace(/```$/, "")
                .trim();
            }

            try {
              const parsed = JSON.parse(jsonString);

              const generatedTitle = parsed.title;
              const generatedDescription = parsed.description;
              // Now you can use generatedTitle and generatedDescription
              console.log("Title:", generatedTitle);
              console.log("Description:", generatedDescription);
            } catch (err) {
              console.error("Failed to parse Gemini output:", err);
            }
            // Complete processing
            const stopProcessing = await axios.post(
              `${process.env.NEXT_API_HOST}api/recording/${data.userId}/complete`,
              {
                filename: data.filename,
                videoUrl: result.secure_url,
                transcript: transcriptText,
                title: generatedTitle,
                description: generatedDescription,
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
