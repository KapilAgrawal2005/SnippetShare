import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      default: "Add your code here...",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: "Add a description for your code snippet...",
    },
    language: {
      type: String,
      //   required: true,
      default: "JavaScript",
    },
    icon: {
      type: String,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    slug: {
      type: String,
      index: true,
      unique: true,
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
        required: true,
      },
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Snippets", snippetSchema);
