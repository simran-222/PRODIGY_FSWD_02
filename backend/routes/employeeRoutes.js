import express from "express";
import { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";
import adminAuth from "../middleware/adminAuth.js";

const employeeRouter = express.Router();

employeeRouter.post("/add", adminAuth, addEmployee);
employeeRouter.get("/all", getEmployees);
employeeRouter.get("/:id", getEmployee);
employeeRouter.put("/update/:id", adminAuth, updateEmployee);
employeeRouter.delete("/delete/:id", adminAuth, deleteEmployee);

export default employeeRouter;