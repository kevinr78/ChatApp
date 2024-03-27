import { Server, Socket } from "socket.io";
import { User } from "../model/user.model.js";
import { hasJWTExpired, verifyjwt } from "./JWT.js";
import jwt from "jsonwebtoken";

const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    let token, err;
    debugger;
    token = socket.handshake.auth?.token;
    if (!token) {
      err = new Error("Authentication error");
      err.statusCode = 401;
      throw err;
    }

    /*     let verifiedtoken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verifiedtoken) {
      err = new Error("UnAuthorized access");
      err.statusCode = 401;
      throw err;
    }

    const user = await User.findById(verifiedtoken?.id).select("name username"); */

    socket.username = token;

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    io.emit("users", users);

    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
    });

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });
};

export default initializeSocketIO;
