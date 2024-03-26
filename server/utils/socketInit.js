import { Server, Socket } from "socket.io";
import { User } from "../model/user.model.js";

const initializeSocketIO = (io) => {
  return io.on("connection", (socket) => {
    console.log(socket.handshake.auth);
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
      });
    }
    console.log(users);
    socket.emit("users", users);

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });
};

export default initializeSocketIO;
