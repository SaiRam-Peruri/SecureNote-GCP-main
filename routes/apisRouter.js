const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const apisController = require("../controllers/apisController.js");

router.post("/", wrapAsync(apisController.createNote));

router.post("/:id", wrapAsync(apisController.getNote));

module.exports = router;
