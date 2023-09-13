const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const routerBlogs = require("./routes/blogsRoutes");
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
app.use("/blogs", routerBlogs);
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.use((req, res) => {
  res.status(404).render("/404", { title: "404" });
});
