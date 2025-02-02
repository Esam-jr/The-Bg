import Post from "../models/post.js";

import { Types } from "mongoose";

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// Create a new blog post
export async function createPost(req, res) {
  const { title, description, img } = req.body;

  if (!title || !description || !img) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide all fields" });
  }

  if (!isValidUrl(img)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid image URL" });
  }

  try {
    const post = await Post.create({ title, description, img });
    console.log("Post Created Successfully!");
    res.status(201).json(post);
  } catch (err) {
    console.log("Error in Post Creation:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}

// Get All Posts
export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }); // ✅ Fixed 'createdAt'
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error in Fetching Posts:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}

// Get a single post
export async function getPost(req, res) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: false, message: "Invalid Post ID" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ status: false, message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log("Error in Fetching Post:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}

// Update a post
export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, description, img } = req.body; // ✅ Extract from req.body

  if (!title || !description || !img) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide all fields" });
  }

  if (!isValidUrl(img)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid image URL" });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { title, description, img },
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ status: false, message: "Post not found!" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.log("Error in Updating Post:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}

// Delete a post
export async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ status: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Post Deleted Successfully" });
  } catch (err) {
    console.log("Error in Deleting Post:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
}
