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
  const msg = {
    to: "limotaxitours@gmail.com",
    from: "limotaxitours@gmail.com",
    subject: "booking confirmation",
    text: `
            PickUp: ${req.body.from}
            Destination: ${req.body.to}
            Luggages: ${req.body.bags}
            limoPrice:${req.body.limo}
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

router.get("/airport", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("airport", { limos: limos });
});

router.get("/wedding", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("wedding", { limos: limos });
});

router.get("/chauffer", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("chauffer", { limos: limos });
});

router.get("/prom", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("prom", { limos: limos });
});

router.get("/childseat", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("childseat", { limos: limos });
});

router.get("/niagrafalls", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("niagrafalls", { limos: limos });
});

router.get("/nightout", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("nightout", { limos: limos });
});

router.get("/casino", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("casino", { limos: limos });
});

router.get("/funeral", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("funeral", { limos: limos });
});

router.get("/funeral", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("funeral", { limos: limos });
});

router.get("/corporateLimo", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("corporateLimo", { limos: limos });
});

router.get("/toronto-maple-leaf", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("torontoMapleLeaf", { limos: limos });
});

router.get("/toronto-blue-jays", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("torontoBlueJays", { limos: limos });
});

router.get("/toronto-fc-limo", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("torontoFCLimo", { limos: limos });
});

router.get("/toronto-argonauts", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("torontoArgoNauts", { limos: limos });
});

router.get("/toronto-raptors", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("torontoRaptors", { limos: limos });
});

router.get("/toronto-pearson", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("torontoPearson", { limos: limos });
});

router.get("/buttonville-municipal-airport", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("buttonville", { limos: limos });
});

module.exports = router;
