import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // allows us to parse incoming requests: req.body
app.use(cookieParser()); // allows us to parse cookies from the request

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);

// Serve static files in development mode
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "./frontend/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});
