const express = require("express");
const BlogsControl = require("../conrollers/blogsControl");
const router = express.Router();
const Blogs = require("../Moduls/blogs");

router.get("/create", BlogsControl.get_create);
router.get("/", BlogsControl.blog_index);
router.post("/add-blogs", BlogsControl.add_blogs);
router.get("/:id", BlogsControl.blog_details);
router.delete("/del-blog/:id", BlogsControl.delete_blog);

module.exports = router;
