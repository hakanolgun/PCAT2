const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const path = require("path");
const fs = require("fs");
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
app.use(fileUpload()); // dosya yükelemede gerekli fileupload middlewareini kullanmak için bu kodu yazıyoruz
app.use(methodOverride("_method")); // override with POST having ?_method=DELETE

// ROUTE
app.get("/", async (req, res) => {
  const photos = await Photo.find().sort("-dateCreated"); // tüm fotoları dbden çekip anasayfaya gönderdik
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
  console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect("/");

  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
  });
  res.redirect("/");
});

app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render("photo", {
    photo,
  });
});

app.get("/photos/edit/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", {
    photo,
  });
});

app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
});

// LISTEN PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda dinlemeye başladı`);
});
