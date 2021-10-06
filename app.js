const express = require("express");
const path = require("path");
const app = express();

const myLogger = (req, res, next) => {
  console.log("this is a middleware");
  next();
};

// MIDDLEWARES
app.use(express.static("public"));
app.use(myLogger);

// ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda dinlemeye başladı`);
});
