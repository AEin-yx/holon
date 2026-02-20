// Generates a brand new jwt when called.

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      jti: uuidv4(),
      type: "access",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      jti: uuidv4(),
      type: "refresh",
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const generateTokenPair = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};
module.exports = {
  generateTokenPair,
  generateAccessToken,
  generateRefreshToken,
};
