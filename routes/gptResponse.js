import express from "express";
import getAnswer from "../controllers/gptResponseController.js";
const router = express.Router();

router.post("/debugger", getAnswer);

export default router;
