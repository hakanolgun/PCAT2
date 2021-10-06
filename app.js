const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Photo = require("./models/Photo");

const app = express();

// CONNECT DB
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public")); // sayfaların public klasöründeki statik dosyalara ulaşması için bu middleware gerekli
app.use(express.urlencoded({ extended: true })); // post işleminde form dataların okuyabilmek ve db'ye gönderebilmek için bu iki middleware gerekli
app.use(express.json()); //post metodunda urlde gönderilen datayı json formatına çevirmek için kullanıyoruz

// ROUTE
app.get("/", async (req, res) => {
  const photos = await Photo.find(); // tüm fotoları dbden çekip anasayfaya gönderdik
  res.render("index", {
    photos: photos,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

// LISTEN PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda dinlemeye başladı`);
});
