const Note = require("../models/notes");
const NotesList = require("../models/notesList");

module.exports.createNote = async (req, res) => {
  try {
    res.render("notes/home.ejs");
  } catch (error) {
    console.log(error);
    res.status(500).render("notes/error.ejs", {
      title: "Internal Server Error",
      message: error.message,
    });
  }
};

module.exports.linkNote = async (req, res) => {
  try {
    const noteData = req.session.newNote;
    delete req.session.newNote;
    res.render("notes/link.ejs", { id: noteData.id, pass: noteData.pass });
  } catch (error) {
    console.log(error);
    res.status(500).render("notes/error.ejs", {
      title: "This is a View-Once Page",
      message: "The contents of this page have already been displayed.",
    });
  }
};

module.exports.getNote = async (req, res) => {
  try {
    let { id } = req.params;

    let noteExists = false;
    let isProtected = false;
    let isDestroyed = false;

    const note = await Note.findById(id);

    if (note) {
      noteExists = true;
      isProtected = note.pass ? true : false;
    } else {
      const notesList = await NotesList.findOne({ noteIds: id });
      if (notesList) {
        noteExists = true;
        isDestroyed = true;
      }
    }

    res.render("notes/warning.ejs", {
      id: id,
      exists: noteExists,
      protected: isProtected,
      destroyed: isDestroyed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render("notes/error.ejs", {
      title: "Internal Server Error",
      message: error.message,
    });
  }
};

module.exports.showNote = async (req, res) => {
  try {
    const noteData = req.session.noteContent;
    delete req.session.noteContent;
    res.render("notes/note.ejs", {
      id: noteData.id,
      content: noteData.content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).render("notes/error.ejs", {
      title: "The Note can't be accessed!",
      message: "Please access the note via the link given.",
    });
  }
};
