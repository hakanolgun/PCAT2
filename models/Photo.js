const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// CREATE SCHEMA
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// CREATE MODEL
const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
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
