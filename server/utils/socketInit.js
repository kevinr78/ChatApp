import { Server, Socket } from "socket.io";
import { User } from "../model/user.model.js";
import { hasJWTExpired, verifyjwt } from "./JWT.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { Session } from "../model/session.model.js";

async function createNewSession(user, socket) {
  let newSessionId, createNewSession;
  newSessionId = uuidv4();
  socket.userId = socket.id;
  socket.username = user.username;
  socket.sessionId = newSessionId;

  createNewSession = await new Session({
    username: socket.username,
    sessionId: socket.sessionId,
    userId: socket.id,
  });

  return createNewSession.save();
}

const socketMiddleware = (io) => {
  return io.use(async (socket, next) => {
    let token, err, sessionIdFromConn, sessionFromMemory;
    debugger;
    token = socket.handshake.auth?.token;
    sessionIdFromConn = socket.handshake.auth?.sessionId;

    if (!token) {
      err = new Error("Authentication error");
      err.statusCode = 401;
      throw err;
    }
    let verifiedtoken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verifiedtoken) {
      err = new Error("UnAuthorized access");
      err.statusCode = 401;
      throw err;
    }

    const user = await User.findById(verifiedtoken?.id).select("name username");

    if (!sessionIdFromConn) {
      let newSession = await createNewSession(user, socket);
      if (!newSession) {
        return next(new Error("Failed to create a new session"));
      }
      return next();
    } else {
      let sessionDoesExist = await Session.findOne({
        sessionId: sessionIdFromConn,
      });
      if (sessionDoesExist) {
        socket.sessionId = sessionDoesExist.sessionId;
        socket.userId = sessionDoesExist.userId;
        socket.username = sessionDoesExist.username;
        return next();
      }
    }
  });
};

const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    socket.emit("session", {
      sessionId: socket.sessionId,
      userId: socket.userId,
    });

    socket.join(socket.userId);
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

    socket.on("private message", ({ message, to }) => {
      socket.to(to).emit("recieve private message", {
        message,
        from: socket.id,
        to,
      });
    });
  });
};

export { initializeSocketIO, socketMiddleware };
