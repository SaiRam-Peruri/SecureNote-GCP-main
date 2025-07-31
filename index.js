require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const apisRouter = require("./routes/apisRouter.js");
const pagesRouter = require("./routes/pagesRouter.js");
const userRouter = require("./routes/userRouter.js");
const User = require("./models/user.js");

// Connect to MongoDB
const mongodbStore = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

mongodbStore.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store: mongodbStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));

mongoose
  .connect(process.env.ATLAS_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.engine("ejs", ejsMate);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.deleted = req.flash("deleted");
  res.locals.appName = process.env.APP_NAME;
  res.locals.currUser = req.user;
  res.locals.domain = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.HOST_URL
    ? `${process.env.HOST_URL}:${process.env.PORT}`
    : `${req.protocol}://${req.get("host")}`;
  next();
});

// Routes
app.use("/", pagesRouter);
app.use("/auth", userRouter);
app.use("/api/notes", apisRouter);

// 404 Page
app.all("*", (req, res) => {
  res.status(404).render("notes/404.ejs");
});

// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("notes/error.ejs", {
    title: "Something went wrong",
    message,
  });
});

// ✅ Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at ${process.env.HOST_URL}:${PORT}`);
  });
} else {
  // ✅ Export for Vercel
  module.exports = serverless(app);
}
