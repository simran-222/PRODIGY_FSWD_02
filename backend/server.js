import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import employeeRouter from "./routes/employeeRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/employee", employeeRouter);
app.use("/api/admin", adminRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Employee Management System API is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});