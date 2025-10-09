import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../Model/admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "myjwtsecretkey";

// Login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};


export const createSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin with this username already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      role: "superadmin", // optional, can use roles like 'superadmin', 'admin'
    });

    res.status(201).json({
      success: true,
      message: "Super Admin created successfully",
      data: {
        id: newAdmin._id,
        username: newAdmin.username,
        role: newAdmin.role,
      },
    });
  } catch (err) {
    console.error("Error creating super admin:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
