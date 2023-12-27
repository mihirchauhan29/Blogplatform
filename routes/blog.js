const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middlewares/auth");

//creating a blog
router.post("/createblog", auth, async (req, res) => {
  const author = req.user._id;
  const { title, content, category } = req.body;
  try {
    const newblog = new Blog({
      title,
      content,
      author,
      category,
    });
    await newblog.save();
    res.json({
      message: "Blog Created successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

//retrive all blogs
router.get("/getallblogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json({
      message: "All blogs retrived successfully",
      blogs,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//to retrive a specific blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json({
      blog,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//to update a blog
router.put("/updateblog/:id", auth, async (req, res) => {
  const { title, content, category } = req.body;
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
      });
    }
    blog.title = title;
    blog.content = content;
    blog.category = category;
    await blog.save();

    res.json({
      message: "Blog Updated Successfully",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// Delete a specific blog
router.delete("/deleteblog/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
      });
    }
    res.json({
      message: "Blog Deleted Successfully",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
