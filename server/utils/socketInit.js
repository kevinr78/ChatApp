import { Server, Socket } from "socket.io";
import { User } from "../model/user.model.js";
import { hasJWTExpired, verifyjwt } from "./JWT.js";
import jwt from "jsonwebtoken";

const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    let token, err;

    token = socket.handshake.auth?.token;
    if (!token) {
      err = new Error("Authentication error");
      err.statusCode = 401;
      throw err;
    }
    console.log(token);
    let verifiedtoken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verifiedtoken) {
      err = new Error("UnAuthorized access");
      err.statusCode = 401;
      throw err;
    }
    debugger;
    const user = await User.findById(verifiedtoken?.id).select("name username");

    socket.username = user.username;

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userId: id,
        user: socket.username,
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
