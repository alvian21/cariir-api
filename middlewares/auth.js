import pkg from "jsonwebtoken";
const { verify } = pkg;
import { print } from "../functions/output.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return print(req, res, {
      code: "ERR_ACCESS",
      message: "Not Authorized, token is missing",
    });
  }

  const token = authHeader.split(" ")[1] || authHeader;

  try {
    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_key";
    const decoded = verify(token, jwtSecret);

    req.user = decoded;
    next();
  } catch (err) {
    return print(req, res, {
      code: "ERR_ACCESS",
      message: "Not Authorized, invalid token",
    });
  }
};

export default authMiddleware;
