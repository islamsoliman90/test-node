const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./Moduls/blogs");
const app = express();

app.listen(3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "create blog" });
});
app.use((req, res) => {
  res.status(404).render("/404", { title: "404" });
});
