import db from "../models/index.js";
import { print } from "../functions/output.js";
import { genSalt, hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";

const { User, Role } = db;
const { sign } = pkg;

export async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return print(req, res, {
        code: "BAD_REQUEST",
        message: "Email is already registered",
      });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const role = await Role.findOne({ where: { name: "user" } });
    if (!role) {
      return print(req, res, {
        code: "BAD_REQUEST",
        message: "Role not found",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      isActive: true,
      roleId: role.id,
    });

    const userData = user.toJSON();
    delete userData.password;

    return print(req, res, {
      code: "OK",
      message: "User successfully registered.",
      data: userData,
    });
  } catch (err) {
    return print(req, res, {
      code: "ERR_DATABASE",
      message: err.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return print(req, res, {
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return print(req, res, {
        code: "UNAUTHORIZED",
        message: "User account is inactive",
      });
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return print(req, res, {
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_key";
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";

    const token = sign(
      {
        id: user.id,
        roleId: user.roleId,
        email: user.email,
      },
      jwtSecret,
      { expiresIn: jwtExpiresIn },
    );
    const userData = user.toJSON();
    delete userData.password;

    return print(req, res, {
      code: "OK",
      message: "Login successful.",
      data: {
        user: userData,
        token,
      },
    });
  } catch (err) {
    return print(req, res, {
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
}
