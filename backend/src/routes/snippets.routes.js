import express from "express";
import {
  createSnippet,
  getPublicSnippets,
  getUserSnippets,
} from "../controllers/snippets/snippets.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-snippet", protect, createSnippet);
router.get("/snippets/public", getPublicSnippets);
router.get("/snippets", protect, getUserSnippets);

export default router;
