const mongoose = require("mongoose");

const limoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  model: {
    type: String,
    required: true,
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
  car: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Car",
  },
});

module.exports = mongoose.model("Limo", limoSchema);
