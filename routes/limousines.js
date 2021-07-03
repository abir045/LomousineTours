const express = require("express");
const { route } = require(".");
const methodOverride = require("method-override");
const Limo = require("../models/limo");
//const uploadPath = path.join("public", Limo.coverImageBasePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
const router = express.Router();
const app = express();
app.use(methodOverride("_method"));

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

//show book route
router.get("/:id", async (req, res) => {
  try {
    const limo = await Limo.findById(req.params.id).populate("limo").exec();
    res.render("limos/show", { limo: limo });
  } catch {
    res.redirect("/");
  }
});

//edit book routr
router.get("/:id/edit", async (req, res) => {
  try {
    const limo = await Limo.findById(req.params.id);
    renderEditPage(res, limo);
  } catch {
    res.redirect("/");
  }
});

//update book route
router.put("/:id", async (req, res) => {
  let limo;
  try {
    limo = await Limo.findById(req.params.id);
    limo.title = req.body.title;
    limo.description = req.body.description;
    limo.pricePerHour = req.body.pricePerHour;
    limo.pricePerDay = req.body.pricePerDay;
    limo.airportTransfer = req.body.airportTransfer;
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(limo, req.body.cover);
    }
    await limo.save();
    res.redirect(`/limos/${limo.id}`);
  } catch (err) {
    console.log(err);
    if (limo != null) {
      renderEditPage(res, limo, true);
    } else {
      res.redirect("/");
    }
  }
});

//delete limo page
router.delete("/:id", async (req, res) => {
  let limo;
  try {
    limo = await Limo.findById(req.params.id);
    await limo.remove();
    res.redirect("/limos");
  } catch (err) {
    console.log(err);
    if (limo != null) {
      res.render("limos/show", {
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
  renderFormPage(res, limo, "new", hasError);

  // try {
  //   const params = {
  //     limo: limo,
  //   };
  //   if (hasError) params.errorMessage = "Error creating Limo";
  //   res.render("limos/new", params);
  // } catch {
  //   res.redirect("/limos");
  // }
}

function renderEditPage(res, limo, hasError = false) {
  renderFormPage(res, limo, "edit", hasError);
  // try {
  //   const params = {
  //     limo: limo,
  //   };
  //   if (hasError) params.errorMessage = "Error creating Limo";
  //   res.render("limos/new", params);
  // } catch {
  //   res.redirect("/limos");
  // }
}

function renderFormPage(res, limo, form, hasError = false) {
  try {
    //const limo = await Limo.findById(req.params.id);
    const params = {
      limo: limo,
    };
    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error updating limo";
      } else {
        params.errorMessage = "Error creating limo";
      }
    }

    res.render(`limos/${form}`, params);
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
