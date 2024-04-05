import express from "express";
import { Server, Socket } from "socket.io";
const app = express();
import http from "http";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import DBConnect from "./utils/DBConnect.js";
import authRoutes from "./routes/auth.route.js";
import chatRoutes from "./routes/chat.route.js";
import { initializeSocketIO, socketMiddleware } from "./utils/socketInit.js";

const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

dotenv.config();
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
      cookie: { httpOnly: false },
    }),
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(import.meta.dirname + "/public/registration.html"));
});

app.use((err, req, res, next) => {
  console.log(err);
});
socketMiddleware(io);
initializeSocketIO(io);

server.listen(3000, (req, res) => {
  DBConnect();
  console.log("server started on port 3000");
});
