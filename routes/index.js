const express = require("express");
const router = express.Router();
const Limo = require("../models/limo");
const nodemailer = require("nodemailer");

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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "limotaxitours@gmail.com",
      pass: "Livestrong1947",
    },
  });

  const mailOptions = {
    from: req.body.email,
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
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

module.exports = router;
