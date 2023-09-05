const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log("hello");
  });
  greet();
  greet();
  //set header content type
  res.setHeader("content-type", "text/html");
  if (req.url == "/") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        console.log(err);
      }
      // res.write(data);
      res.statusCode = 200;
      res.end(data);
    });
  } else if (req.url == "/about") {
    fs.readFile("./about.html", (err, data) => {
      if (err) {
        console.log(err);
      }
      // res.write(data);
      res.statusCode = 200;

      res.end(data);
    });
  } else if (req.url == "/about-me") {
    res.statusCode = 301;
    res.setHeader("Location", "/about");
    res.end();
  } else {
    fs.readFile("./404.html", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.statusCode = 404;
      res.write(data);
      res.end();
    });
  }
});

// localhost is the default value for 2nd argument
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
