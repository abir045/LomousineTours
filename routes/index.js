if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const Limo = require("../models/limo");

const flatpickr = require("flatpickr");

const sendGridMail = require("@sendgrid/mail");
const limo = require("../models/limo");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }
  res.render("index", { limos: limos });
});

// Ians method for sending mails

router.get("/booking", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }
  res.render("booking", { limos: limos });
});

router.post("/booking", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  const msg = {
    to: "limotaxitours@gmail.com",
    from: "limotaxitours@gmail.com",
    subject: "booking confirmation",
    text: `
            PickUp: ${req.body.from}
            Destination: ${req.body.to}
            distance: ${req.body.output}
            Luggages: ${req.body.bags}
            limoType:${req.body.limo}
            Number of passengers: ${req.body.people}
            Full Name: ${req.body.name}
            Phone No: ${req.body.phone}
            email: ${req.body.email}
            PickUp date: ${req.body.pickupDate}
            Childseat:${req.body.childSeat}
            Card Number: ${req.body.cardNumber}
            Expiary: ${req.body.expiryDate}
            CCV:${req.body.cardCcv} `,
  };

  try {
    await sendGridMail.send(msg);

    // res.send(
    //   "your booking is confirmed, one of our asociates will get in touch with you to provide a confirmation number"
    // );
    req.flash(
      "success",
      "your booking is confirmed, one of our associates will get in touch with you to provide a confirmation number"
    );
    res.redirect("/booking");
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error(error.response.body);
    }
    req.flash("error", "Sorry, something went wrong");
    res.redirect("back");
  }
});

module.exports = router;
