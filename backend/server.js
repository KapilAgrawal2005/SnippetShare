import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/helpers/errorhandler.js";

// Import routes directly instead of dynamic loading
import userRoutes from "./src/routes/user.routes.js";
import snippetsRoutes from "./src/routes/snippets.routes.js";
import tagsRoutes from "./src/routes/tags.routes.js";

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", snippetsRoutes);
app.use("/api/v1", tagsRoutes);

// Add a health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

const server = async () => {
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

// For Vercel serverless deployment
export default app;

// For local development
if (process.env.NODE_ENV !== "production") {
  server();
}
