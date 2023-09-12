const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blogs = require("./Moduls/blogs");
const app = express();
url =
  "mongodb+srv://islam1234:test1234@nodeexpressprojects.ihvra5o.mongodb.net/blogsIslam?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    app.listen(3000, () => {
      console.log("db is conncted");
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
  Blogs.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("index.ejs", { title: "blogs", blogs });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs/add-blogs", (req, res) => {
  const blog = new Blogs(req.body);
  blog.save().then((result) => {
    res.redirect("/blogs");
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create blog" });
});
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blogs.findById(id)
    .then((blog) => {
      res.render("details.ejs", { title: "blog details", blog });
    })
    .catch((err) => console.log(err));
});
app.delete("/blogs/del-blog/:id", (req, res) => {
  const id = req.params.id;
  Blogs.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});
app.use((req, res) => {
  res.status(404).render("/404", { title: "404" });
});
