const express = require("express");
const path = require("path");
const ejs = require("ejs");
const app = express();

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public")); // sayfaların public klasöründeki statik dosyalara ulaşması için bu middleware gerekli
app.use(express.urlencoded({ extended: true })); // post işleminde form dataların okuyabilmek ve db'ye gönderebilmek için bu iki middleware gerekli
app.use(express.json()); //post metodunda urlde gönderilen datayı json formatına çevirmek için kullanıyoruz

// ROUTE
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// LISTEN PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda dinlemeye başladı`);
});
