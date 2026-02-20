// a bag to use when we revoke a access token

const { Redis } = require("ioredis");

const redisClient = new Redis();

module.exports = { redisClient };
