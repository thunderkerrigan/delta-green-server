import Socket from "socket.io";
import { ArticleModel } from "./database/models/articles/articles.model";

export const io = new Socket.Server(3001, {
  cors: { origin: "https://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentID) => {
    const document = await ArticleModel.findOrCreateArticle(documentID);
    socket.join(documentID);
    socket.emit("load-document", document.content);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentID).emit("receive-changes", delta);
    });
    socket.on("save-document", async (content) => {
      await ArticleModel.findByIdAndUpdate(documentID, { content });
    });
  });
  //   console.log("connected to socket!");
});
