// const dotenv = require("dotenv");
// const { GoogleGenerativeAI }=require("@google/generative-ai");
//   dotenv.config();
//   const apiKey = process.env.GEMINI_API_KEY;
//   console.log(apiKey, "gemini.js");
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
// //   async function run() {
//    const chatSession = model.startChat({
//       generationConfig,
//     });

//    module.exports = { chatSession };
  
// //     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// //     console.log(result.response.text());
// //   }
  
// //   run();

// //  const prompt = `Generate 5 technical interview questions with short answers in JSON format for a candidate applying for: Role: ${role} ,Tech Stack: ${desc} ,Experience: ${experience} years
// // Format the response as valid JSON with keys: question, answer`;
// // const result = await chatSession.sendMessage(prompt);