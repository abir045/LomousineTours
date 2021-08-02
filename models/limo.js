const mongoose = require("mongoose");
//const path = require("path");
//const coverImageBasePath = "uploads/bookCovers";

const limoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  pricePerHour: {
    type: Number,
    required: true,
  },

  pricePerKm: {
    type: Number,
    required: true,
  },

  pricePerDay: {
    type: Number,
    required: true,
  },

  airportTransfer: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  coverImageType: {
    type: String,
    required: true,
  },
});

limoSchema.virtual("coverImagePath").get(function () {
  if (this.coverImage != null && this.coverImageType != null) {
    //return path.join("/", coverImageBasePath, this.coverImageName);
    return `data:${this.coverImageType};charset=utf-8;base64,
    ${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Limo", limoSchema);
//module.exports.coverImageBasePath = coverImageBasePath;
