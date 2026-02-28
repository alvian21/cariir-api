import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  findAll,
  findOne,
  create,
  update,
  deleteRole,
} from "../controllers/roleController.js";
import db from "../models/index.js";
import { print } from "../functions/output.js";

vi.mock("../models/index.js", () => {
  return {
    default: {
      Role: {
        findAll: vi.fn(),
        findByPk: vi.fn(),
        create: vi.fn(),
      },
    },
  };
});

vi.mock("../functions/output.js", () => ({
  print: vi.fn((req, res, payload) => payload),
}));

describe("roleController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return successfully with role data", async () => {
      const mockRoles = [
        { id: 1, name: "Admin", alias: "admin", isActive: true },
      ];
      db.Role.findAll.mockResolvedValue(mockRoles);

      const result = await findAll(mockReq, mockRes);

      expect(db.Role.findAll).toHaveBeenCalled();
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "OK",
        data: mockRoles,
      });
      expect(result.code).toBe("OK");
    });

    it("should return error when database throws", async () => {
      const dbError = new Error("Database error");
      db.Role.findAll.mockRejectedValue(dbError);

      const result = await findAll(mockReq, mockRes);

      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "ERR_DATABASE",
        message: "Database error",
      });
      expect(result.code).toBe("ERR_DATABASE");
    });
  });

  describe("findOne", () => {
    it("should return successfully when role exists", async () => {
      mockReq.params.id = 1;
      const mockRole = { id: 1, name: "Admin" };
      db.Role.findByPk.mockResolvedValue(mockRole);

      const result = await findOne(mockReq, mockRes);

      expect(db.Role.findByPk).toHaveBeenCalledWith(1);
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "OK",
        data: mockRole,
      });
      expect(result.code).toBe("OK");
    });

    it("should return NOT_FOUND when role does not exist", async () => {
      mockReq.params.id = 99;
      db.Role.findByPk.mockResolvedValue(null);

      const result = await findOne(mockReq, mockRes);

      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "NOT_FOUND",
        message: "Role not found",
      });
      expect(result.code).toBe("NOT_FOUND");
    });

    it("should return error when database throws", async () => {
      mockReq.params.id = 1;
      db.Role.findByPk.mockRejectedValue(new Error("DB error"));

      const result = await findOne(mockReq, mockRes);

      expect(result.code).toBe("ERR_DATABASE");
    });
  });

  describe("create", () => {
    it("should create a role successfully", async () => {
      mockReq.body = { alias: "user", name: "User" };
      const createdRole = {
        id: 2,
        alias: "user",
        name: "User",
        isActive: true,
      };
      db.Role.create.mockResolvedValue(createdRole);

      const result = await create(mockReq, mockRes);

      expect(db.Role.create).toHaveBeenCalledWith({
        alias: "user",
        name: "User",
        isActive: true,
      });
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "OK",
        message: "Role successfully created.",
        data: createdRole,
      });
      expect(result.code).toBe("OK");
    });

    it("should create a role with isActive explicitly false", async () => {
      mockReq.body = { alias: "guest", name: "Guest", isActive: false };
      db.Role.create.mockResolvedValue({});

      await create(mockReq, mockRes);

      expect(db.Role.create).toHaveBeenCalledWith({
        alias: "guest",
        name: "Guest",
        isActive: false,
      });
    });

    it("should handle database error", async () => {
      mockReq.body = { alias: "test" };
      db.Role.create.mockRejectedValue(new Error("Creation failed"));

      const result = await create(mockReq, mockRes);

      expect(result.code).toBe("ERR_DATABASE");
    });
  });

  describe("update", () => {
    it("should update role successfully", async () => {
      mockReq.params.id = 1;
      mockReq.body = { name: "Super Admin" };
      const mockRoleInstance = {
        alias: "admin",
        name: "Admin",
        isActive: true,
        update: vi.fn().mockResolvedValue(true),
      };
      db.Role.findByPk.mockResolvedValue(mockRoleInstance);

      const result = await update(mockReq, mockRes);

      expect(db.Role.findByPk).toHaveBeenCalledWith(1);
      expect(mockRoleInstance.update).toHaveBeenCalledWith({
        alias: "admin",
        name: "Super Admin",
        isActive: true,
      });
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "OK",
        message: "Role successfully updated.",
        data: mockRoleInstance,
      });
      expect(result.code).toBe("OK");
    });

    it("should return NOT_FOUND if role to update does not exist", async () => {
      mockReq.params.id = 99;
      db.Role.findByPk.mockResolvedValue(null);

      const result = await update(mockReq, mockRes);

      expect(result.code).toBe("NOT_FOUND");
    });

    it("should handle database errors during update", async () => {
      mockReq.params.id = 1;
      db.Role.findByPk.mockRejectedValue(new Error("DB failure"));

      const result = await update(mockReq, mockRes);

      expect(result.code).toBe("ERR_DATABASE");
    });
  });

  describe("deleteRole", () => {
    it("should delete role successfully", async () => {
      mockReq.params.id = 1;
      const mockRoleInstance = {
        destroy: vi.fn().mockResolvedValue(true),
      };
      db.Role.findByPk.mockResolvedValue(mockRoleInstance);

      const result = await deleteRole(mockReq, mockRes);

      expect(db.Role.findByPk).toHaveBeenCalledWith(1);
      expect(mockRoleInstance.destroy).toHaveBeenCalled();
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "OK",
        message: "Role successfully deleted.",
      });
      expect(result.code).toBe("OK");
    });

    it("should return NOT_FOUND if role to delete does not exist", async () => {
      mockReq.params.id = 99;
      db.Role.findByPk.mockResolvedValue(null);

      const result = await deleteRole(mockReq, mockRes);

      expect(result.code).toBe("NOT_FOUND");
    });

    it("should handle database errors during deletion", async () => {
      mockReq.params.id = 1;
      db.Role.findByPk.mockRejectedValue(new Error("Delete error"));

      const result = await deleteRole(mockReq, mockRes);

      expect(result.code).toBe("ERR_DATABASE");
    });
  });
});
