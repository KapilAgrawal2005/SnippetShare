import express from "express";
import {
  createSnippet,
  getPublicSnippets,
  getUserSnippets,
  getSnippetsById,
} from "../controllers/snippets/snippets.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-snippet", protect, createSnippet);
router.get("/snippets/public", getPublicSnippets);
router.get("/snippets", protect, getUserSnippets);
router.get("/snippet/:id", protect, getSnippetsById);

export default router;
