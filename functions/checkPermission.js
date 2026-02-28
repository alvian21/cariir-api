import db from "../models/index.js";
import { print } from "./output.js";

const { Permission, Role } = db;

export default (permissionAlias) => {
  console.log(permissionAlias);
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.roleId) {
        return print(req, res, {
          code: "ERR_ACCESS",
          data: "User not authenticated or role not found",
        });
      }

      const permission = await Permission.findOne({
        where: { alias: permissionAlias },
        include: [
          {
            model: Role,
            where: { id: req.user.roleId },
            through: { attributes: [] },
            required: true,
          },
        ],
      });

      if (permission) {
        return next();
      } else {
        return print(req, res, {
          code: "ERR_ACCESS",
          data: "You do not have permission to perform this action",
        });
      }
    } catch (err) {
      console.error("Check Permission Error:", err);
      return print(req, res, {
        code: "ERR_DATABASE",
        data: err.message,
      });
    }
  };
};
