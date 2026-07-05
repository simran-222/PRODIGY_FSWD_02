import jwt from "jsonwebtoken";
import Employee from "../models/employeeModel.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const employees = await Employee.find();

    const totalEmployees = employees.length;

    const departments = [...new Set(employees.map(item => item.department))];

    const recentEmployees = employees.slice(-5).reverse();

    res.json({
      success: true,
      totalEmployees,
      totalDepartments: departments.length,
      recentEmployees,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};