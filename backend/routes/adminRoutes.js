import express from "express";
import { adminLogin, getDashboard } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/dashboard", adminAuth, getDashboard);

export default adminRouter;