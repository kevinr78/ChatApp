import express from "express";
const router = express.Router();

import {
  loginController,
  signInController,
} from "../controllers/auth.controller.js";

router.post("/signin", signInController);
router.post("/login", loginController);

export default router;
