const globalErrorList = (err, req, res, next) => {
  // Handle Zod validation errors
  if (err.name === "ZodError") {
    return res.status(400).json({ errors: err.flatten()["fieldErrors"] });
  }

  // Handle your custom errors by name OR message
  const errorMap = {
    USER_NOT_FOUND: { status: 404, msg: "User not found. Please register." },
    INVALID_CREDENTIALS: { status: 401, msg: "Invalid email or password" },
    USER_ALREADY_EXISTS: { status: 409, msg: "User already exists!" },
    BAD_REQUEST: { status: 400, msg: "Validation failed!" },
    UNAUTHORIZED: { status: 401, msg: "Session Revoked." },
    JsonWebTokenError: { status: 401, msg: "Invalid token" },
    TokenExpiredError: { status: 401, msg: "Token expired" },
  };

  // Check by name first, then by message
  const mapped = errorMap[err.name] || errorMap[err.message];

  if (mapped) {
    return res.status(mapped.status).json({ message: mapped.msg });
  }

  // Catch-all for unexpected errors
  console.error("Unhandled error:", err);
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = { globalErrorList };
