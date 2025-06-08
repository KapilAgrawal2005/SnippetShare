import express from "express";
import {
  bulkAddTags,
  createTags,
  deleteTag,
  getTagById,
  getTags,
} from "../controllers/tags/tags.controller.js";
import { adminMiddleware, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-tag", protect, createTags);
router.get("/tags", getTags);
router.get("/tag/:id", getTagById);
router.delete("/tag/:id", protect, deleteTag);
router.post("/bulk-tags", protect, adminMiddleware, bulkAddTags);

export default router;
