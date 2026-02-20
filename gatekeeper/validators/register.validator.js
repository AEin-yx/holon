const { z } = require("zod");

// A schema which checks signup form's correct input

const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Invalid input")
      .max(50, "Invalid input")
      .trim(),

    email: z.string().email({ message: "Invalid email format" }),

    password: z.string().min(8, "Invalid input"),

    password0: z.string().min(1, "Invalid input"),
  })
  .refine(
    (data) => data.password === data.password0, //
    {
      message: "Passwords must match", //
      path: ["password0"], //
    },
  );

// Here we validate the registration form ie the schema we have been given

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { signupSchema, validate };
