const express = require("express");
const { route } = require(".");
const router = express.Router();
const Car = require("../models/car");

//all cars route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const cars = await Car.find(searchOptions);
    res.render("cars/index", { cars: cars, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//new car route

router.get("/new", (req, res) => {
  res.render("cars/new", { car: new Car() });
});

//creat cars route
router.post("/", async (req, res) => {
  const car = new Car({
    name: req.body.name,
  });

  try {
    const newCar = await car.save();

    //res.redirect(`cars/${newCar.id}`)
    res.redirect("cars");
  } catch {
    res.render("cars/new", {
      car: car,
      errorMessage: "Error creating car",
    });
  }
});

module.exports = router;
