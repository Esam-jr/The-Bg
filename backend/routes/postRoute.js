import express from "express";
const router = express.Router();
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authenticator from "../middleware/auth.js";

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPost);

router.post("/posts", authenticator, createPost);
router.put("/posts/:id", authenticator, updatePost);
router.delete("/posts/:id", authenticator, deletePost);

export default router;
