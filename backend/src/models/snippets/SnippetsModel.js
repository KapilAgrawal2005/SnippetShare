import mongoose from "mongoose";
import slugify from "slugify";
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// pre middleware to esure the slug is unique

snippetSchema.pre("save", async function (next) {
  try {
    if (!this.slug) {
      // generate the slug using slugify
      this.slug = slugify(this.title, {
        lower: true,
        strict: true,
        replacement: "-",
      });
    }

    // ensure the slug is unique
    let isSlugExists = await mongoose.models.Snippets.findOne({
      slug: this.slug,
    });

    let counter = 1;

    while (isSlugExists) {
      this.slug = `${
        (this.title,
        {
          lower: true,
          strict: true,
          replacement: "-",
        })
      }-${counter}`;
      isSlugExists = await mongoose.models.Snippets.findOne({
        slug: this.slug,
      });
      counter++;
    }
  } catch (error) {
    console.log("Error in generating the slug: ", error);
    return next(error);
  }
});

export default mongoose.model("Snippets", snippetSchema);
