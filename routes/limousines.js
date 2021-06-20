const express = require("express");
const { route } = require(".");
const router = express.Router();
const limo = require("../models/limo");

//all limo route
router.get("/", async (req, res) => {
  res.send("all limos");
});

//new limo route

router.get("/new", (req, res) => {
  res.send("new limo");
});

//create limo route
router.post("/", async (req, res) => {
  res.send("create limo");
});

module.exports = router;
