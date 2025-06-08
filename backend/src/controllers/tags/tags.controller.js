import asyncHandler from "express-async-handler";
import Tags from "../../models/tags/TagsModel.js";

export const createTags = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    if (!name || name === "") {
      return res.status(400).json({ message: "Tag name is required." });
    }

    const tag = await Tags.create({ name, user: userId });

    await tag.save();

    res.status(201).json({
      message: "Tag created successfully.",
      tag,
    });
  } catch (error) {
    console.error("Error in createTags:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getTags = asyncHandler(async (req, res) => {
  try {
    const tags = await Tags.find();

    res.status(200).json({
      message: "Tags fetched successfully.",
      tags,
    });
  } catch (error) {
    console.error("Error in getTags:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const deleteTag = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tagId = req.params.id;
    const tag = await Tags.findById(tagId);

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    if (!tag) {
      return res.status(404).json({ message: "Tag not found." });
    }

    await Tags.deleteOne(tag);

    res.status(200).json({
      message: "Tag deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteTag:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getTagById = asyncHandler(async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tags.findById(tagId);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found." });
    }

    res.status(200).json({
      message: "Tag fetched successfully.",
      tag,
    });
  } catch (error) {
    console.error("Error in getTagsById:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

//for admin only
export const bulkAddTags = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { tags } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    if (!tags || tags.length === 0 || !Array.isArray(tags)) {
      return res.status(400).json({ message: "Tags are required." });
    }

    const tagsDoc = tags.map((tag) => ({
      name: tag,
      user: userId,
    }));

    const createdTags = await Tags.insertMany(tagsDoc);

    res.status(201).json({
      message: "Tags added successfully.",
      tags: createdTags,
    });
  } catch (error) {
    console.log("Error in bulkAddTags:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});
