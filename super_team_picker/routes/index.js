const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {

    "use strict";

    res.redirect("/cohorts");
});

module.exports = router;
