// Packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Custom Objects
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middlewares/middleware.js");
const userController = require("../controllers/userController.js");

router
  .route("/signup")
  // 1. SignUp Route
  .get(userController.renderSignupForm)
  // 2. Create Route
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  // 3. Login Route
  .get(userController.renderLoginForm)
  // 4. Login Validation Route
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/auth/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );

// 5. Logout Route
router.get("/logout", userController.logout);

module.exports = router;
