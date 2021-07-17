if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const Limo = require("../models/limo");
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
// var smtpTransport = require("nodemailer-smtp-transport");
const flatpickr = require("flatpickr");
const sendGridMail = require("@sendgrid/mail");
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

router.post("/", (req, res) => {
  function getMessage() {
    return {
      to: "limotaxitours@gmail.com",
      from: "limotaxitours@gmail.com",
      subject: "Booking email with Node.js and sendgrid",
      text: `
            PickUp: ${req.body.origin}
            Destination: ${req.body.destination}
            Luggages: ${req.body.luggage}
            limoType:${req.body.limoType}
            Number of passengers: ${req.body.passengers}
            Full Name: ${req.body.fullName}
            Phone No: ${req.body.phone}
            PickUp date: ${req.body.pickupDate}
            Card Number: ${req.body.cardNumber}
            Expiary: ${req.body.cardExpiary}
            CCV:${req.body.cardCcv} `,
      //html: `<strong>${body}</strong>`,
    };
  }

  async function sendEmail() {
    try {
      await sendGridMail.send(getMessage());
      console.log("Test email sent successfully");
    } catch (error) {
      console.error("Error sending test email");
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }

  (async () => {
    console.log("Sending booking email");
    await sendEmail();
  })();

  //     const mailOptions = {
  //       from: "limotaxitours@gmail.com",
  //       to: "limotaxitours@gmail.com",
  //       subject: `message from ${req.body.email}`,
  //       text: `PickUp: ${req.body.origin}
  //          Destination: ${req.body.destination}
  //          Luggages: ${req.body.luggage}
  //          Number of passengers: ${req.body.passengers}
  //          Full Name: ${req.body.fullName}
  //          Phone No: ${req.body.phone}
  //          PickUp date: ${req.body.pickupDate}
  //          Card Number: ${req.body.cardNumber}
  //          Expiary: ${req.body.cardExpiary}
  //          CCV:${req.body.cardCcv} `,
  //     };

  //     const result = await transport.sendMail(mailOptions);
  //     return result;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // sendMail()
  //   .then((result) => console.log("Email Sent..", result))
  //   .catch((error) => console.log(error.message));

  // transporter.sendMail(mailOptions, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //     res.send("error");
  //   } else {
  //     console.log("Booking confirmed: " + info.response);
  //     res.send("success");
  //   }
  // });
});

module.exports = router;
