const jwt = require("jsonwebtoken");
const { redisClient } = require("../config/redis");

const blacklist = async (req) => {
  // Get the token from the browser
  const refreshToken = req.cookies.refreshToken;

  const refreshTokenPayload = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );

  // Get the current time as a UNIX timestamp (seconds since epoch)
  const currentTime = Math.floor(Date.now() / 1000);

  // in seconds
  const refreshTokenLife = refreshTokenPayload.exp - currentTime;

  // Revoke authorization of the client by putting it in a redis
  await redisClient.set(
    `refresh:${refreshTokenPayload.jti}`,
    true,
    "EX",
    refreshTokenLife,
  );
};

module.exports = { blacklist };
