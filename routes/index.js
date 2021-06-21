const express = require("express");
const router = express.Router();
const Limo = require("../models/limo");

router.get("/", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }
  res.render("index", { limos: limos });
});

module.exports = router;
