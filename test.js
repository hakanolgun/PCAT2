const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CONNECT DB
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CREATE SCHEMA
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

// CREATE MODEL
const Photo = mongoose.model("Photo", PhotoSchema);

/*
// CREATE DOCUMENT
Photo.create({
  title: "Photo Test 22",
  description: "Photo description 22 loerem",
});
*/
/*
// FIND DOCUMENT
Photo.find({}, (err, data) => {
  console.log(data);
});
*/
