import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Snippets from "../../models/snippets/SnippetsModel.js";

// Returns [{ date: "YYYY-MM-DD", count: N }, ...] for the last 90 days
export const getUserActivity = asyncHandler(async (req, res) => {
  const userId = req.params.id; // or req.query.id, depending on your route

  // Get activity for the last 365 days
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 364);

  // Aggregate snippets by day
  const activity = await Snippets.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Fill in days with zero activity
  const result = [];
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateString = date.toISOString().slice(0, 10);
    const day = activity.find((a) => a._id === dateString);
    result.push({ date: dateString, count: day ? day.count : 0 });
  }

  res.json(result);
});
