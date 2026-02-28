import db from "../models/index.js";
import { print } from "../functions/output.js";

const { Role } = db;

export const findAll = async (req, res) => {
  try {
    const data = await Role.findAll();

    return print(req, res, {
      code: "OK",
      data: data,
    });
  } catch (err) {
    return print(req, res, {
      code: "ERR_DATABASE",
      message: err.message,
    });
  }
};

export const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findByPk(id);

    if (!data) {
      return print(req, res, {
        code: "NOT_FOUND",
        message: "Role not found",
      });
    }

    return print(req, res, {
      code: "OK",
      data: data,
    });
  } catch (err) {
    return print(req, res, {
      code: "ERR_DATABASE",
      message: err.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { alias, name, isActive } = req.body;

    const data = await Role.create({
      alias,
      name,
      isActive: isActive !== undefined ? isActive : true,
    });

    return print(req, res, {
      code: "OK",
      message: "Role successfully created.",
      data: data,
    });
  } catch (err) {
    return print(req, res, {
      code: "ERR_DATABASE",
      message: err.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { alias, name, isActive } = req.body;

    const data = await Role.findByPk(id);

    if (!data) {
      return print(req, res, {
        code: "NOT_FOUND",
        message: "Role not found",
      });
    }

    await data.update({
      alias: alias !== undefined ? alias : data.alias,
      name: name !== undefined ? name : data.name,
      isActive: isActive !== undefined ? isActive : data.isActive,
    });

    return print(req, res, {
      code: "OK",
      message: "Role successfully updated.",
      data: data,
    });
  } catch (err) {
    return print(req, res, {
      code: "ERR_DATABASE",
      message: err.message,
    });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findByPk(id);

    if (!data) {
      return print(req, res, {
        code: "NOT_FOUND",
        message: "Role not found",
      });
    }

    await data.destroy();

    return print(req, res, {
      code: "OK",
      message: "Role successfully deleted.",
    });
  } catch (err) {
    return print(req, res, {
      code: "ERR_DATABASE",
      message: err.message,
    });
  }
};
