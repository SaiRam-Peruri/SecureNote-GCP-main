const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
  },
  expiry: {
    type: Date,
    required: true,
    index: { expires: "0s" },
  },
  email: {
    type: String,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
