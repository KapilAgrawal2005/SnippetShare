import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Snippets from "../../models/snippets/SnippetsModel.js";

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

    const snippet = await Snippets.create({
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

    const snippets = await Snippets.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await Snippets.countDocuments(query);

    if (!snippets || snippets.length === 0) {
      return res.status(404).json({ message: "No public snippets found." });
    }

    return res.status(200).json({
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

    const snippets = await Snippets.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await Snippets.countDocuments({ user: userId });

    if (!snippets || snippets.length === 0) {
      return res
        .status(404)
        .json({ message: "No snippets found for this user." });
    }

    return res.status(200).json({
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

    const snippet = await Snippets.findOne({ _id: snippetId, user: userId })
      .populate("tags", "name")
      .populate("user", "_id name photo");

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    return res.status(200).json({
      snippet,
    });
  } catch (error) {
    console.error("Error in getSnippetsById:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getPublicSnippetById = asyncHandler(async (req, res) => {
  try {
    const snippetId = req.params.id;

    const snippet = await Snippets.findOne({ _id: snippetId, isPublic: true })
      .populate("tags", "name")
      .populate("user", "_id name photo");

    if (!snippet) {
      return res.status(404).json({ message: "Public snippet not found." });
    }

    return res.status(200).json({
      snippet,
    });
  } catch (error) {
    console.error("Error in getPublicSnippetById:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const deleteSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }
    const snippet = await Snippets.findOne({
      _id: snippetId,
      user: userId,
    });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    await Snippets.deleteOne({ _id: snippetId });

    return res.status(200).json({
      message: "Snippet deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleteSnippet:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const updateSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;
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
        .json({ message: "Description must be at least 10 characters long." });
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

    const snippet = await Snippets.findOne({ _id: snippetId, user: userId });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }
    snippet.title = title || snippet.title;
    snippet.code = code || snippet.code;
    snippet.description = description || snippet.description;
    snippet.language = language || snippet.language;
    snippet.tags = tags || snippet.tags;
    snippet.isPublic = isPublic || snippet.isPublic;
    await snippet.save();

    return res.status(200).json({
      message: "Snippet updated successfully.",
      snippet,
    });
  } catch (error) {
    console.error("Error in updateSnippet:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const likeSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Not Authorized! Please Login." });
    }

    const snippet = await Snippets.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found." });
    }

    if (snippet.likedBy.includes(userId)) {
      // User already liked the snippet, so we remove the like
      snippet.likes -= 1;
      snippet.likedBy = snippet.likedBy.filter(
        (like) => like.toString() !== userId
      );
      await snippet.save();

      return res.status(200).json({
        likes: snippet.likes,
      });
    } else {
      // User has not liked the snippet, so we add the like
      snippet.likes += 1;
      snippet.likedBy.push(userId);

      await snippet.save();

      return res.status(200).json({
        likes: snippet.likes,
        message: "Snippet liked successfully.",
      });
    }
  } catch (error) {
    console.error("Error in likeSnippet:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getLikedSnippets = asyncHandler(async (req, res) => {
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

    const query = { likedBy: userId };

    if (tagId) {
      query.tags = { $in: [tagId] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const snippets = await Snippets.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await Snippets.countDocuments(query);

    if (!snippets || snippets.length === 0) {
      return res.status(404).json({ message: "No liked snippets found." });
    }

    return res.status(200).json({
      snippets,
      totalSnippets,
      totalPages: Math.ceil(totalSnippets / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getLikedSnippets:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export const getLeaderBoard = asyncHandler(async (req, res) => {
  try {
    const leaderboard = await Snippets.aggregate([
      {
        $group: {
          _id: "$user", // group by user
          totalLikes: { $sum: "$likes" }, // sum of likes
          snippetCount: { $sum: 1 }, // count of snippets
        },
      },
      {
        $lookup: {
          from: "users", // join with users collection
          localField: "_id",
          foreignField: "_id", // join on _id field
          as: "userInfo", // The name of the new array field that will hold the user info
        },
      },
      {
        $unwind: "$userInfo", // flattern the userInfo array
      },
      {
        $project: {
          _id: 0,
          name: "$userInfo.name",
          photo: "$userInfo.photo",
          totalLikes: 1,
          _id: "$userInfo._id",
          totalLikes: 1,
          snippetCount: 1,
          score: {
            $add: [
              { $toInt: "$totalLikes" },
              { $multiply: ["$snippetCount", 10] },
            ],
          },
        },
      },
      {
        $sort: { totalLikes: -1 }, // sort by total likes
      },

      {
        $limit: 100, // get top 100 users
      },
    ]);

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.log("Error in getLeaderboard", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const getPopularSnippets = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tagId = req.query.tagId;
    const search = req.query.search;

    // calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // build the query object
    const query = { isPublic: true };

    if (tagId) {
      // filter by tagId if tagId is provided
      query.tags = { $in: [tagId] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } }, // i for case-insensitive
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // fetch popular snippets
    const popularSnippets = await Snippets.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ likes: -1 })
      .skip(skip)
      .limit(limit * 10); // get 10 times the limit to get a good sample;

    // shuffle teh snippets
    const shuffledSnippets = popularSnippets.sort(() => 0.5 - Math.random());

    // get snippets for the current page
    const snippets = shuffledSnippets.slice((page - 1) * limit, page * limit);

    // send paginated response
    return res.status(200).json({
      totalSnippets: popularSnippets.length,
      totalPages: Math.ceil(popularSnippets.length / limit),
      currentPage: page,
      snippets,
    });
  } catch (error) {
    console.log("Error in getPopularSnippets", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});