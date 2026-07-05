import Employee from "../models/employeeModel.js";
import transporter from "../config/nodemailer.js";

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
    } = req.body;

    // Generate Employee ID
    const lastEmployee = await Employee.findOne().sort({ employeeId: -1 });
    let employeeId = "EMP001";

    if (lastEmployee) {
    const lastNumber = parseInt(lastEmployee.employeeId.replace("EMP", ""));
    employeeId = `EMP${String(lastNumber + 1).padStart(3, "0")}`;
  }

    // If employee already exists
    console.log("Email received:", email);

    const existingEmployee = await Employee.findOne({ email });

    console.log("Existing employee:", existingEmployee);
    

    if (existingEmployee) {
      return res.json({
        success: false,
        message: "Employee already exists",
      });
    }

    // Create employee
    const employee = new Employee({
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      salary,
      joiningDate,
    });

// Check empty fields
if (
  !name ||
  !email ||
  !phone ||
  !department ||
  !designation ||
  !salary ||
  !joiningDate
) {
  return res.json({
    success: false,
    message: "All fields are required",
  });
}

// Email Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.json({
    success: false,
    message: "Invalid email address",
  });
}

// Phone Validation
if (!/^\d{10}$/.test(phone)) {
  return res.json({
    success: false,
    message: "Phone number must be exactly 10 digits",
  });
}

// Salary Validation
if (salary <= 0) {
  return res.json({
    success: false,
    message: "Salary must be greater than 0",
  });
}    

    await employee.save();

    try {
    const info = await transporter.sendMail({
    from: `"Employee Management System" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Welcome to Employee Management System",
    html: `
      <h2>Hello ${name}</h2>
      <p>Welcome to Employee Management System.</p>
      <p>Your Employee ID is <b>${employeeId}</b>.</p>
    `,
  });

  console.log("Email sent:", info);
} catch (err) {
  console.log("Email error:", err);
}

    res.json({
      success: true,
      message: "Employee added successfully",
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json({
      success: true,
      employees,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Employee
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      employee,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { email, phone, salary } = req.body;

if (!email.includes("@")) {
  return res.json({
    success: false,
    message: "Please enter a valid email",
  });
}

if (phone.length !== 10) {
  return res.json({
    success: false,
    message: "Phone number must be 10 digits",
  });
}

if (salary <= 0) {
  return res.json({
    success: false,
    message: "Salary must be greater than 0",
  });
}

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    await transporter.sendMail({
      from: `"Employee Management System" <${process.env.SENDER_EMAIL}>`,
      to: updatedEmployee.email,
      subject: "Employee Information Updated",
      html: `
    <h2>Hello ${updatedEmployee.name}</h2>

    <p>Your employee information has been updated successfully.</p>

    <p>If you were not expecting this change, please contact the HR department.</p>

    <br>

    <p>Regards,</p>

    <h3>Employee Management System</h3>
  `,
});

    if (!updatedEmployee) {
      return res.json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};