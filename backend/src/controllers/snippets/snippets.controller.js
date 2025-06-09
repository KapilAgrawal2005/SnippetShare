import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import SnippetsModel from "../../models/snippets/SnippetsModel.js";

export const createSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, code, description, tags, language, isPublic } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    if (!title || title.length < 3) {
      return res
        .status(400)
        .json({ message: "Title must be at least 3 characters long." });
    }

    if (!description || description.length < 10) {
      return res
        .status(400)
        .json({ message: "Title must be at least 10 characters long." });
    }

    if (!code || code.length < 5) {
      return res
        .status(400)
        .json({ message: "Code must be at least 5 characters long." });
    }

    if (
      !tags ||
      tags.length === 0 ||
      !tags.every((tag) => mongoose.Types.ObjectId.isValid(tag))
    ) {
      return res.status(400).json({ message: "At least one tag is required." });
    }

    const snippet = await SnippetsModel.create({
      title,
      code,
      description,
      language,
      tags,
      isPublic,
      user: userId,
    });
    await snippet.save();
    res.status(201).json({
      message: "Snippet created successfully.",
      snippet,
    });
  } catch (error) {
    console.error("Error in createSnippet:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getPublicSnippets = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.query.userId;
    const tagId = req.query.tagId;
    const search = req.query.search;

    const skip = (page - 1) * limit;

    const query = { isPublic: true };

    if (userId) {
      query.user = userId;
    }
    if (tagId) {
      query.tags = tagId;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const snippets = await SnippetsModel.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await SnippetsModel.countDocuments(query);

    if (!snippets || snippets.length === 0) {
      return res.status(404).json({ message: "No public snippets found." });
    }

    return res.status(200).json({
      message: "Snippets retrieved successfully.",
      snippets,
      totalSnippets,
      totalPages: Math.ceil(totalSnippets / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getSnippets:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getUserSnippets = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tagId = req.query.tagId;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    const query = { user: userId };

    if (tagId) {
      query.tags = { $in: [tagId] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const snippets = await SnippetsModel.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await SnippetsModel.countDocuments({ user: userId });

    if (!snippets || snippets.length === 0) {
      return res
        .status(404)
        .json({ message: "No snippets found for this user." });
    }

    return res.status(200).json({
      message: "User snippets retrieved successfully.",
      snippets,
      totalSnippets,
      totalPages: Math.ceil(totalSnippets / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getUserSnippets:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getSnippetsById = asyncHandler(async (req, res) => {
  try {
    const snippetId = req.params.id;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    const snippet = await SnippetsModel.findById({ snippetId, userId });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    await snippet.populate("tags", "name");
    await snippet.populate("user", "_id name photo");

    return res.status(200).json({
      message: "Snippet retrieved successfully.",
      snippet,
    });
  } catch (error) {
    console.error("Error in getSnippetsById:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});
