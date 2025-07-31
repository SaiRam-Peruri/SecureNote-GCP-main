const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController.js");

router.post("/", notesController.createNote);

router.post("/notify", notesController.notifyNote);

router
  .route("/:id")
  .get(notesController.getNote)
  .delete(notesController.deleteNote);

module.exports = router;
