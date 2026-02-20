const { signup, login } = require("../service/auth.service");
const { blacklist } = require("../repositories/token.repository");
const { archiveToken, purgeToken } = require("../utils/tokens/token-manager");

// when the login button is clicked
const userLogin = async (req, res, next) => {
  try {
    // Try to get the token
    const { token } = await login(req.body);

    // store token in browser from here
    archiveToken(res, token);

    // after a successful attempt to store, go to dashboard
    return res.redirect("/api/dashboard");
  } catch (error) {
    // if any error happened, send it to the global error handler
    next(error);
  }
};

// When a register button is pressed, we validate the inputs
const userRegister = async (req, res, next) => {
  try {
    // Wait for the Signup to happen somewhere else
    await signup(req.body);

    // Congratulations, we have a new user
    return res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (err) {
    next(err); // send it to global error handler
  }
};

// When you press logout
const userLogout = async (req, res, next) => {
  try {
    // revoked the token here
    purgeToken(res);

    // blacklisted the refresh token in redis
    await blacklist(req);
  } catch (error) {
    next(error);
  }

  // Redirect the user a new page.
  return res.redirect("/api/logout");
};

module.exports = { userLogin, userRegister, userLogout };
