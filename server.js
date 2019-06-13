const express = require("express");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.render("maintain", {
    pageTitle: "Maintenance Page"
  });
  next();
});

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.url} ${req.method}`;
  fs.appendFile("server.log", `${log}\n`, err => {
    if (err) console.log("Error:", err);
  });
  console.log(log);
  next();
});

app.use(express.static(`${__dirname}/public`));
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to the node app",
    currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    pageTitle: "404 Page Not Found",
    currentYear: new Date().getFullYear()
  });
});

app.listen(3000, () => console.log(`Server running in port 3000`));
