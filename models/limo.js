const mongoose = require("mongoose");
const path = require("path");
const coverImageBasePath = "uploads/bookCovers";

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

  pricePerDay: {
    type: Number,
    required: true,
  },
  airportTransfer: {
    type: Number,
    required: true,
  },
  coverImageName: {
    type: String,
    required: true,
  },
});

limoSchema.virtual("coverImagePath").get(function () {
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName);
  }
});

module.exports = mongoose.model("Limo", limoSchema);
module.exports.coverImageBasePath = coverImageBasePath;
