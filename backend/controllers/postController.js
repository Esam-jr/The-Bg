const Post = require("../models/post");
const mongoose = require("mongoose");

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

//create a new blog post
export const CreateBlogPost = async (req, res) => {
  const { title, description, img } = req.body;

  if (!isValidUrl(img)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid image URL" });
  }

  if (!title || !description || !img) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide all fields" });
  }

  try {
    const post = await Post.create({ title, description, img });
    console.log("Post Created Successfully!");
    res.status(201).json(post);
  } catch (err) {
    console.log("Error in Post Creation:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

//get All Posts
export const getAllposts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ CreatedAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error in Fetching Posts:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

//get a single post
export const getSinglePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
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
};

//update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, img } = req.params;
  try {
    const post = Post.findByIdAndUpdate(
      id,
      { title, description, img },
      { new: true }
    );
    if (!post) {
      res.status(404).json({ status: false, message: "Post not found!" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log("Error in Updating Post:", err.message);
    res.status(500).json({ status: false, message: "Server Error" });
  }
};

//delete a post
export const deletePost = async (req, res) => {
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
};
