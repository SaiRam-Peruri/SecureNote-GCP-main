const User = require("../models/user.js");

// 1. SignUp Route
module.exports.renderSignupForm = (req, res) => {
  // res.send("form");
  res.render("users/signup.ejs");
};

// 2. Create Route
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    console.log(`New User :- ${registeredUser.username}`);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash(
        "success",
        `Hi @${username}!  Welcome to ${res.locals.appName}`
      );
      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/auth/signup");
  }
};

// 3. Login Route
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// 4. Login Validation Route
module.exports.login = async (req, res) => {
  let { username } = req.body;
  req.flash(
    "success",
    `Welcome to ${res.locals.appName}! You are logged in as @${username}`
  );
  if (res.locals.redirectUrl) res.locals.redirectUrl = res.locals.redirectUrl;
  else res.locals.redirectUrl = "/";
  res.redirect(res.locals.redirectUrl);
};

// 5. Logout Route
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    if (res.locals.deleted.length === 0)
      req.flash("success", "You are logged out!");
    else req.flash("deleted", res.locals.deleted[0]);
    res.redirect("/");
  });
};
