const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageControllers");
const app = express();

// CONNECT DB
mongoose
  .connect(
    "mongodb+srv://hakan:16g0JebbnlKtB38p@cluster0.mq4pj.mongodb.net/pcat-blog?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected :)");
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public")); // sayfaların public klasöründeki statik dosyalara ulaşması için bu middleware gerekli
app.use(express.urlencoded({ extended: true })); // post işleminde form dataların okuyabilmek ve db'ye gönderebilmek için bu iki middleware gerekli
app.use(express.json()); //post metodunda urlde gönderilen datayı json formatına çevirmek için kullanıyoruz
app.use(fileUpload()); // dosya yükelemede gerekli fileupload middlewareini kullanmak için bu kodu yazıyoruz
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
); // override with POST having ?_method=DELETE
// hangi methodları override edeceğini belirtiyoruz cünkü photo delete işlemi a linki üzerinden get metodu ile yapılıyor

// ROUTE
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPage);
app.get("/photos/edit/:id", pageController.getEditPage);

// LISTEN PORT
const port = process.env.PORT || 7710;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda dinlemeye başladı`);
});
