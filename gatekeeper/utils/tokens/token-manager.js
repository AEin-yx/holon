// store the access token in the browser's cookie section

const archiveToken = (res, token) => {
  res.cookie("accesstoken", token.accessToken, {
    httpOnly: true, // Prevents JS access
    secure: process.env.NODE_ENV === "production", // Only sent over HTTPS
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/",
  });

  // store the refresh token in the browser's cookie section
  res.cookie("refreshtoken", token.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 60 * 60 * 1000, // 7days
    path: "/",
  });
};

// Clear the cookie whenever a logout attempt was made

const purgeToken = (res) => {
  res.clearCookie("accesstoken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // Clear the cookie from browser whenever a logout attempt was made
  res.clearCookie("refreshtoken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

module.exports = { archiveToken, purgeToken };
