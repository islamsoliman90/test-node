const Blogs = require("../Moduls/blogs");

const blog_index = (req, res) => {
  Blogs.find()
    .sort({ createdAt: -1 })
    .then((blogs) => {
      res.render("index.ejs", { title: "blogs", blogs });
    })
    .catch((err) => console.log(err));
};

const add_blogs = (req, res) => {
  const blog = new Blogs(req.body);
  blog.save().then((result) => {
    res.redirect("/");
  });
};

const get_create = (req, res) => {
  res.render("create", { title: "create blog" });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blogs.findById(id)
    .then((blog) => {
      res.render("details.ejs", { title: "blog details", blog });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "404" });
    });
};

const delete_blog = (req, res) => {
  const id = req.params.id;
  Blogs.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).render("404", { title: "404" });
    });
};

module.exports = {
  blog_index,
  add_blogs,
  get_create,
  blog_details,
  delete_blog,
};
