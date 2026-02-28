import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    fullName: z
      .string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string",
      })
      .min(1, "Full name cannot be empty"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password must be at least 6 characters"),
    roleId: z
      .string({
        invalid_type_error: "Role ID must be a string",
      })
      .uuid("Invalid Role ID format")
      .optional()
      .nullable(),
    isActive: z
      .boolean({
        invalid_type_error: "isActive must be a boolean",
      })
      .optional(),
  }),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "User ID is required",
        invalid_type_error: "User ID must be a string",
      })
      .uuid("Invalid User ID format"),
  }),
  body: z.object({
    fullName: z
      .string({
        invalid_type_error: "Full name must be a string",
      })
      .min(1, "Full name cannot be empty")
      .optional(),
    email: z
      .string({
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format")
      .optional(),
    password: z
      .string({
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password must be at least 6 characters")
      .optional(),
    roleId: z
      .string({
        invalid_type_error: "Role ID must be a string",
      })
      .uuid("Invalid Role ID format")
      .optional()
      .nullable(),
    isActive: z
      .boolean({
        invalid_type_error: "isActive must be a boolean",
      })
      .optional(),
  }),
});

export default {
  createUserSchema,
  updateUserSchema,
};
