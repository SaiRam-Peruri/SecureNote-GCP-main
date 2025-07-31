let Note = require("../models/notes.js");
let NotesList = require("../models/notesList.js");
let nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "SecureNote";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
};

const decrypt = (CipherText) => {
  const bytes = CryptoJS.AES.decrypt(CipherText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

let notifyUser = async (note) => {
  if (!note.email) return null;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email configuration is missing.");
    return "Email configuration is missing.";
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: note.email,
    subject: "Your Note Has Been Accessed",
    text: `The note with id #${note._id} has been accessed & destroyed.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return [
      true,
      `${note.email} has been notified that the note has been opened.`,
    ];
  } catch (error) {
    console.log("Error sending email:", error.message);
    return [false, `Failed to send mail to ${note.email}`];
  }
};

module.exports.createNote = async (req, res) => {
  try {
    let { content, expire, email, pass } = req.body;

    const expireMapping = {
      1: 60 * 60,
      2: 60 * 60 * 24,
      3: 60 * 60 * 24 * 7,
      4: 60 * 60 * 24 * 30,
    };

    const expireSeconds = expireMapping[expire] || 60 * 60 * 24 * 365;

    const expiryDate = new Date(Date.now() + expireSeconds * 1000);

    const encryptedContent = encrypt(content);

    const hashedPass = pass ? await bcrypt.hash(pass, 10) : null;

    const newNote = new Note({
      content: encryptedContent,
      pass: hashedPass,
      expiry: expiryDate,
      email: email || null,
    });

    await newNote.save();

    let notesList = await NotesList.findOne();
    if (notesList) {
      notesList.noteIds.push(newNote._id);
      await notesList.save();
    } else {
      const newNotesList = new NotesList({
        noteIds: [newNote._id],
      });
      await newNotesList.save();
    }

    notesList = await NotesList.find({});

    req.session.newNote = { id: newNote._id, pass: pass };
    res.redirect("/link");
  } catch (error) {
    console.log(error);
    res.status(500).render("notes/error.ejs", { message: error.message });
  }
};

module.exports.getNote = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Note.findById(id);

    if (!note) {
      const notesList = await NotesList.findOne({ noteIds: id });
      if (notesList) {
        console.log("Note has been deleted");
        req.flash("deleted", "Note has been deleted");
        res.redirect(`/`);
        return;
      } else {
        console.log("No such note exists");
        req.flash("error", "No such note exists");
        res.redirect(`/`);
        return;
      }
    }

    if (note.pass != null) {
      const { pass } = req.body;

      if (!pass) {
        console.log("Password needed to access this note.");
        req.flash("error", "Password needed to access this note.");
        res.redirect(`/id/${id}`);
        return;
      }

      if (pass && !(await bcrypt.compare(pass, note.pass))) {
        console.log("Password does not match. Please try again!");
        req.flash("error", "Password does not match. Please try again!");
        res.redirect(`/id/${id}`);
        return;
      } else {
        console.log("Password matched successfully!!!");
      }
    }

    const noteContent = decrypt(note.content);

    let emailStatus = null;
    if (note.email) {
      emailStatus = await notifyUser(note);
      console.log(emailStatus);
      if (emailStatus[0]) {
        req.flash("success", emailStatus[1]);
      } else {
        req.flash("error", emailStatus[1]);
      }
    }

    await Note.deleteOne({ _id: id });

    req.session.noteContent = { id: note._id, content: noteContent };
    res.redirect(`/note`);
  } catch (error) {
    console.log(error);
    res.status(500).render("notes/error.ejs", { message: error.message });
  }
};
