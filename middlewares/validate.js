import { print } from "../functions/output.js";

/**
 * Express middleware to validate request data using Zod schema.
 * @param {import("zod").AnyZodObject} schema - The Zod schema to validate against.
 */
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error.name === "ZodError" || error.errors || error.issues) {
      const errList = error.errors || error.issues || [];
      const errorMessage = errList.map((err) => err.message).join(", ");
      return print(req, res, {
        code: "INVALID_REQUEST",
        message: errorMessage || "Validation error",
        data: errList,
      });
    }

    return print(req, res, {
      code: "GENERAL_ERR",
      message: error.message,
    });
  }
};

export default validate;
