const express = require("express");
const router = express.Router();

const pagesController = require("../controllers/pagesController.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middlewares/middleware.js");

router.get("/", isLoggedIn, wrapAsync(pagesController.createNote));

router.get("/link", isLoggedIn, wrapAsync(pagesController.linkNote));

router.get("/id/:id", wrapAsync(pagesController.getNote));

router.get("/note", wrapAsync(pagesController.showNote));

module.exports = router;
