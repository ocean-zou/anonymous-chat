import express from "express";
import { createServer } from "node:http";
/*import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";*/
import { Server } from "socket.io";
import cors from "cors";
import compareProductWithCompetitors from './api.js';
import { competitors } from './dummyData.js';

const app = express();
app.use(cors());
// Example usage
/*
const product = "A white table";


compareProductWithCompetitors(product, competitors)
  .then((scores) => {
    // Do something with the scores
    console.log("Received scores:", scores);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  const server = createServer(app);
  
const io = new Server(server, {
  connectionStateRecovery: {},
});
*/
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
//   socket.emit("hello", "Welcome to the chat! No one knows who you are!");
  socket.on("chat message", (msg) => {
    console.log("message rece from backend: " + msg);
    io.emit("chat message", msg);
  });
});

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
