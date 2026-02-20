const prisma = require("../prisma/prisma");
const { generateTokenPair } = require("../utils/tokens/generate-token-pair");
const { verifyPassword } = require("../utils/hash.util");
const { hashPassword } = require("../utils/hash.util");

const signup = async ({ username, email, password }) => {
  let hashedPassword = await hashPassword(password);

  // Check if user is already registered
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  // if user is registered, throw err called user exist
  if (existingUser) throw new Error("USER_ALREADY_EXISTS");

  // create a brand new user and set it inside the db
  await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  // return success
  return { success: true, message: "user created successfully!" };
};

const login = async ({ email, password }) => {
  // Authenticating the users
  const user = await prisma.users.findUnique({
    where: { email },
  });

  // No user exists to login
  if (!user) throw new Error("USER_NOT_FOUND");

  // Check to see if two passwords match
  const isMatch = await verifyPassword(user.password, password);
  // passwords doesn't match
  if (!isMatch) throw new Error("INVALID_CREDENTIALS");

  // generate a token here
  const token = generateTokenPair(user);

  return { token };
};

module.exports = { signup, login };
