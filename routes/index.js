if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
//const Limo = require("../models/limo");

const flatpickr = require("flatpickr");

const sendGridMail = require("@sendgrid/mail");
const limo = require("../models/limo");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", async (req, res) => {
  // let limos;
  // try {
  //   limos = await Limo.find();
  // } catch {
  //   limos = [];
  // }
  // res.render("index", { limos: limos });
  res.render("index");
});

// Ians method for sending mails

router.get("/booking", async (req, res) => {
  // let limos;
  // try {
  //   limos = await Limo.find();
  // } catch {
  //   limos = [];
  // }
  //res.render("booking", { limos: limos });
  res.render("booking");
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
            card Holder:${req.body.cardHolder}
            Card Number: ${req.body.cardNumber}
            Expiary: ${req.body.expiryDate}
            CCV:${req.body.cardCcv} `,
  };

  try {
    await sendGridMail.send(msg);

    req.flash(
      "success",
      "Awesome! Your booking has been received. If we have any issues, we will contact you accordingly. If you need to make any changes, please call us at 437-980-7915. We hope to see you soon! Thanks"
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

router.get("/billy-bishop-airport", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("billy-bishop", { limos: limos });
});

router.get("/hamilton-airport", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("hamilton-airport", { limos: limos });
});

router.get("/niagara-falls-airport", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("niagara-falls-airport", { limos: limos });
});

router.get("/buffalo-niagara-international", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("buffalo-niagara-international", { limos: limos });
});

router.get("/chartright-private-airport", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("chartright-private-airport", { limos: limos });
});

router.get("/landmark-aviation-charter", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("landmark-aviation-charter", { limos: limos });
});

router.get("/skyservice-esso-avitat", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("skyservice-esso-avitat", { limos: limos });
});

router.get("/ajax", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("ajax-City", { limos: limos });
});

router.get("/aldershot", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("aldershot-City", { limos: limos });
});

router.get("/alliston", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("alliston-City", { limos: limos });
});

router.get("/alton", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("alton-City", { limos: limos });
});

router.get("/bracebridge", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("bracebridge-City", { limos: limos });
});

router.get("/brampton", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("brampton-City", { limos: limos });
});

router.get("/brockville", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("brockville-City", { limos: limos });
});

router.get("/brooklin", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("brooklin-City", { limos: limos });
});

router.get("/brougham", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("brougham-City", { limos: limos });
});

router.get("/collingwood", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("collingwood-City", { limos: limos });
});

router.get("/concord", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("concord-City", { limos: limos });
});

router.get("/cookstown", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("cookstown-City", { limos: limos });
});

router.get("/courtice", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("courtice-City", { limos: limos });
});

router.get("/erin", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("erin-City", { limos: limos });
});

router.get("/etobicoke", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("etobicoke-City", { limos: limos });
});

router.get("/fenelon", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("fenelon-City", { limos: limos });
});

router.get("/grand-valley", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("grand-valley-City", { limos: limos });
});

router.get("/inglewood", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("inglewood-City", { limos: limos });
});

router.get("/king-city", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("king-City", { limos: limos });
});
router.get("/kingston", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("kingston-City", { limos: limos });
});

router.get("/kitchener", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("kitchener-City", { limos: limos });
});

router.get("/lindsay", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("lindsay-City", { limos: limos });
});

router.get("/niagarafalls", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("niagara-City", { limos: limos });
});

router.get("/northbay", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("northbay-City", { limos: limos });
});

router.get("/northyork", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("northyork-City", { limos: limos });
});

router.get("/oakville", async (req, res) => {
  let limos;
  try {
    limos = await Limo.find();
  } catch {
    limos = [];
  }

  res.render("oakville-City", { limos: limos });
});

module.exports = router;
