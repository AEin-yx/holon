const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis");

// Authenticate that the access token is valid or not before entering dashboard
const verifyAccessToken = async (req, res, next) => {
  const accessToken =
    req.cookies.accesstoken || req.headers["authorization"]?.split(" ")[1];

  // if the token is invalid, go to login
  if (!accessToken) {
    return res.status(401).redirect("/api/login");
  }

  // verify the token
  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).redirect("/api/login");
  }
};

// Middleware to check refresh tokens
const verifyRefreshToken = async (req, res, next) => {
  const refreshToken =
    req.cookies.refreshtoken || req.headers["authorization"]?.split(" ")[1];

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if revoked
    const isRevoked = await redisClient.get(`refresh:${verified.jti}`);
    if (isRevoked) {
      return res.status(401).json({ error: "Token revoked" });
    }

    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
