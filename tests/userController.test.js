import { describe, it, expect, vi, beforeEach } from "vitest";
import { findAll } from "../controllers/userController.js";
import db from "../models/index.js";
import { print } from "../functions/output.js";

// Mock dependencies
vi.mock("../models/index.js", () => {
  return {
    default: {
      User: {
        findAll: vi.fn(),
      },
    },
  };
});

vi.mock("../functions/output.js", () => ({
  print: vi.fn((req, res, payload) => payload),
}));

describe("userController", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.clearAllMocks();
  });

  describe("findAll", () => {
    it("should return successfully with user data", async () => {
      const mockUsers = [
        {
          id: 1,
          fullName: "Test User",
          email: "test@example.com",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      db.User.findAll.mockResolvedValue(mockUsers);

      const result = await findAll(mockReq, mockRes);

      expect(db.User.findAll).toHaveBeenCalledWith({
        attributes: [
          "id",
          "fullName",
          "email",
          "isActive",
          "createdAt",
          "updatedAt",
        ],
      });
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "SUCCESS",
        message: "User data retrieved successfully",
        data: mockUsers,
      });
      expect(result.code).toBe("SUCCESS");
      expect(result.data).toEqual(mockUsers);
    });

    it("should return internal server error when database throws", async () => {
      const dbError = new Error("Database connection failed");
      db.User.findAll.mockRejectedValue(dbError);

      const result = await findAll(mockReq, mockRes);

      expect(db.User.findAll).toHaveBeenCalled();
      expect(print).toHaveBeenCalledWith(mockReq, mockRes, {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
        data: dbError,
      });
      expect(result.code).toBe("INTERNAL_SERVER_ERROR");
    });
  });
});
