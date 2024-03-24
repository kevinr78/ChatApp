import express from "express";
const router = express.Router();
import path from "path";
import { User } from "../model/user.model.js";

router.get("/home", async (req, res, next) => {
  let root = process.cwd();
  let connectedUsers = [];
  console.log(req.session.user);
  for (let [id, socket] of req.io.of("/").sockets) {
    connectedUsers.push({
      userId: id,
      username: req.session.user.firstName + req.session.user.lastName,
    });
  }

  res.sendFile(path.join(root, "/public/home.html"));
});
export default router;
