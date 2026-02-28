import db from "../models/index.js";
const { User } = db;
import { print } from "../functions/output.js";

export async function findAll(req, res) {
  try {
    const data = await User.findAll({
      attributes: [
        "id",
        "fullName",
        "email",
        "isActive",
        "createdAt",
        "updatedAt",
      ],
    });
    return print(req, res, {
      code: "SUCCESS",
      message: "User data retrieved successfully",
      data: data,
    });
  } catch (error) {
    return print(req, res, {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
      data: error,
    });
  }
}
