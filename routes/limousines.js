const express = require("express");
const { route } = require(".");
//const multer = require("multer");
//const path = require("path");
//const fs = require("fs");
const Limo = require("../models/limo");
//const uploadPath = path.join("public", Limo.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const router = express.Router();
// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeTypes.includes(file.mimetype));
//   },
// });

//all limo route
router.get("/", async (req, res) => {
  let query = Limo.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  try {
    const limos = await query.exec();
    //await Limo.find({});
    res.render("limos/index", {
      limos: limos,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

//new limo route

router.get("/new", async (req, res) => {
  renderNewPage(res, new Limo());
});

//create limo route
router.post("/", async (req, res) => {
  //const fileName = req.file != null ? req.file.filename : null;
  const limo = new Limo({
    title: req.body.title,
    pricePerHour: req.body.pricePerHour,
    pricePerDay: req.body.pricePerDay,
    airportTransfer: req.body.airportTransfer,
    description: req.body.description,
  });
  saveCover(limo, req.body.cover);

  try {
    const newLimo = await limo.save();
    res.redirect(`limos/${newLimo.id}`);
    //res.redirect("limos");
  } catch {
    // if (limo.coverImageName != null) {
    //   removeLimoCover(limo.coverImageName);
    // }
    renderNewPage(res, limo, true);
  }
});

//delete limo page
router.delete("/:id", async (req, res) => {
  let limo;
  try {
    limo = await Limo.findById(req.params.id);
    await limo.remove();
    res.redirect("/limos");
  } catch {
    if (limo != null) {
      res.render("limos/new", {
        limo: limo,
        errorMessage: "Could not remove limo",
      });
    } else {
      res.redirect("/");
    }
  }
});

// function removeLimoCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), (err) => {
//     if (err) console.error(err);
//   });
// }

function renderNewPage(res, limo, hasError = false) {
  try {
    const params = {
      limo: limo,
    };
    if (hasError) params.errorMessage = "Error creating Limo";
    res.render("limos/new", params);
  } catch {
    res.redirect("/limos");
  }
}

function saveCover(limo, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    limo.coverImage = new Buffer.from(cover.data, "base64");
    limo.coverImageType = cover.type;
  }
}

module.exports = router;
