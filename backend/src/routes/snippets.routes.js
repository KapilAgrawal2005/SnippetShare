import express from "express";
import {
  createSnippet,
  getPublicSnippets,
  getUserSnippets,
  getSnippetsById,
  getPublicSnippetById,
  deleteSnippet,
  updateSnippet,
  likeSnippet,
  getLikedSnippets,
  getLeaderBoard,
  getPopularSnippets,
} from "../controllers/snippets/snippets.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-snippet", protect, createSnippet);
router.get("/snippets/public", getPublicSnippets);
router.get("/snippets", protect, getUserSnippets);
router.get("/snippet/:id", protect, getSnippetsById);
router.get("/snippet/public/:id", getPublicSnippetById);
router.delete("/snippet/:id", protect, deleteSnippet);
router.patch("/snippet/:id", protect, updateSnippet);
router.patch("/snippet/like/:id", protect, likeSnippet);
router.get("/snippets/liked", protect, getLikedSnippets);
router.get("/leaderboard", getLeaderBoard);
router.get("/snippets/popular", getPopularSnippets);

export default router;
