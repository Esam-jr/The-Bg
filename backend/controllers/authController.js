import { User } from "../models/User.js"; // Correct import
import jwt from "jsonwebtoken"; // Import jwt directly
import bcrypt from "bcryptjs"; // Import bcrypt directly
import dotenv from "dotenv";
dotenv.config();

// Register admin
export async function register(req, res) {
  const { username, password } = req.body;
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password During Registration:", hashedPassword);
    // Create a new user with the hashed password
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login admin
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("Stored Hashed Password:", user.password);
    console.log("Provided Password:", password);
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    const testMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", testMatch);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
