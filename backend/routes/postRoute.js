const express = require("express");
const router = express.Router();
const {
  CreateBlogPost,
  getAllposts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { authenticator } = require("../middleware/auth");

router.get("/posts", getAllposts);
router.get("/posts/:id", getSinglePost);

router.post("/posts", authenticator, CreateBlogPost);
router.put("/posts/:id", authenticator, updatePost);
router.delete("/posts/:id", authenticator, deletePost);

module.exports = router;
