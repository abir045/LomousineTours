const express = require("express");
const router = express.Router();
const Limo = require("../models/limo");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
var smtpTransport = require("nodemailer-smtp-transport");
const flatpickr = require("flatpickr");
require("dotenv").config();

// const CLIENT_ID =
//   "1043229087968-pefg2lv9l7qo9568f9gk4u9fqq1hi4gv.apps.googleusercontent.com";
// const CLIENT_SECRET = "Hh24XS0pVRYX-wYFoJIDdGuR";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04Q6hnGkRHR06CgYIARAAGAQSNwF-L9IreM4NUbtuZTQDNJpO7bPzXx3LK79hd5KC1JZ1DBNDS33s0s9Nida7a1JV88FktYLJvXg";
//const accessToken = oAuth2Client.getAccessToken();

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
  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   process.env.REDIRECT_URI
  // );
  //oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  //const accessToken = oAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASS,
      },
      // auth: {
      //   type: "OAth2",
      //   user: process.env.GMAIL_USERNAME,
      //   clientId: process.env.CLIENT_ID,
      //   clientSecret: process.env.CLIENT_SECRET,
      //   refreshToken: process.env.REFRESH_TOKEN,
      //   accessToken: accessToken,
      // },
      // tls: {
      //   rejectUnauthorized: false,
      // },
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
           Card Number: ${req.body.cardNumber}
           Expiary: ${req.body.cardExpiary}
           CCV:${req.body.cardCcv} `,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log("Booking confirmed: " + info.response);
      res.send("success");
    }
  });

  // console.log(req.body);
  // async function sendMail() {
  //   try {
  //     const accessToken = await oauth2Client.getAccessToken();
  //     const transport = nodemailer.createTransport(
  //       {
  //         service: "gmail",
  //         auth: {
  //           type: "OAth2",
  //           user: "limotaxitours@gmail.com",
  //           clientId: CLIENT_ID,
  //           clientSecret: CLIENT_SECRET,
  //           refreshToken: REFRESH_TOKEN,
  //           accessToken: accessToken,
  //         },
  //       }
  //       // smtpTransport({
  //       //   service: "gmail",
  //       //   host: "smtp.gmail.com",
  //       //   auth: {
  //       //     user: "limotaxitours@gmail.com",
  //       //     pass: "Livestrong1947",
  //       //   },
  //       // })
  //     );

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
