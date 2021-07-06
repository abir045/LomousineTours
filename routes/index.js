const express = require("express");
const router = express.Router();
const Limo = require("../models/limo");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

router.get("/", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }
  res.render("index", { limos: limos });
});

router.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "limotaxitours@gmail.com",
        pass: "Livestrong1947",
      },
    })
  );

  const mailOptions = {
    from: "limotaxitours@gmail.com",
    to: "limotaxitours@gmail.com",
    subject: `message from ${req.body.email}`,
    text: `PickUp: ${req.body.origin} 
           Destination: ${req.body.destination} 
           Luggages: ${req.body.luggage} 
           Number of passengers: ${req.body.passengers} 
           Full Name: ${req.body.fullName} 
           Phone No: ${req.body.phone}  
           PickUp date: ${req.body.pickupDate} 
           Card NO: ${req.body.cardInfo}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log("Booking confirmed: " + info.response);
      res.send("success");
    }
  });
});

module.exports = router;
