import express from "express";
import * as roleController from "../controllers/roleController.js";
import validate from "../middlewares/validate.js";
import roleValidation from "../validations/role.validation.js";
import authMiddleware from "../middlewares/auth.js";
import checkPermission from "../functions/checkPermission.js";

const { createRoleSchema, updateRoleSchema } = roleValidation;
const router = express.Router();

router.use(authMiddleware);

router.get("/", checkPermission("role.read"), roleController.findAll);
router.get("/:id", checkPermission("role.read"), roleController.findOne);
router.post(
  "/",
  checkPermission("role.create"),
  validate(createRoleSchema),
  roleController.create,
);
router.put(
  "/:id",
  checkPermission("role.update"),
  validate(updateRoleSchema),
  roleController.update,
);
router.delete(
  "/:id",
  checkPermission("role.delete"),
  roleController.deleteRole,
);

export default router;
