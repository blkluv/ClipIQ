const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const dotenv =require('dotenv');
const server = http.createServer(app);
const { Server } = require("socket.io");


dotenv.config();

app.use(cors());
const io=new Server(server,{
    cors:{
        origin: process.env.ELECTRON_HOST
    }
})

server.listen(5000,()=>{
    console.log("Server running on port 5000")
})