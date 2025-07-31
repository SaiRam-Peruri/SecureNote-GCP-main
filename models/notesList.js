const mongoose = require("mongoose");

const notesListSchema = new mongoose.Schema({
  noteIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Note",
    default: [],
  },
});

const NotesList = mongoose.model("NotesList", notesListSchema);

module.exports = NotesList;
