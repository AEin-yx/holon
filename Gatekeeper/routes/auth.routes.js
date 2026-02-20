const express = require("express");
const router = express.Router();
const {
  userLogin,
  userRegister,
  userLogout,
} = require("../controllers/auth.controller");
const { validate, signupSchema } = require("../validators/register.validator");
const { verifyAccessToken } = require("../middleware/auth.middleware");
const { removeCache } = require("../middleware/remcache.middleware");

// landing page of the website
router.get("/", (req, res) => {
  return res.render("index");
});

// Get the login page
router.get("/login", (req, res) => {
  return res.render("login");
});

// Login using credentials
router.post("/login", (req, res, next) => {
  userLogin(req, res, next);
});

// Get the registration page
router.get("/register", (req, res) => {
  res.render("register");
});

// Create a new account
router.post("/register", validate(signupSchema), (req, res, next) => {
  userRegister(req, res, next);
});

// Get the dashboard
router.get("/dashboard", verifyAccessToken, removeCache, (req, res) => {
  return res.render("dashboard", { username: req.user.username });
});

// Logout from the session
router.get("/logout", (req, res) => {
  return res.render("logout");
});

// logout event
router.post("/logout", (req, res, next) => {
  userLogout(req, res, next);
});

module.exports = router;
