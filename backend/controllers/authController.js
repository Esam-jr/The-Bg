import { User } from "../models/User.js"; // Correct import
import jsonwebtoken from "jsonwebtoken";
const sign = jsonwebtoken;
import bcrypt from "bcryptjs";
const { compare, hash } = bcrypt;

// Register admin
export async function register(req, res) {
  const { username, password } = req.body;
  try {
    // Hash the password before saving it to the database
    const hashedPassword = await hash(password, 10);

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
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare the provided password with the stored hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create JWT token
    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set token expiration to 1 hour
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
