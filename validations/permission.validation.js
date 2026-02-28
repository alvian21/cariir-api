import z from "zod";

const createPermissionSchema = z.object({
  body: z.object({
    alias: z
      .string({
        required_error: "Alias is required",
        invalid_type_error: "Alias must be a string",
      })
      .min(1, "Alias cannot be empty"),
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty"),
    isActive: z
      .boolean({
        invalid_type_error: "isActive must be a boolean",
      })
      .optional(),
  }),
});

const updatePermissionSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "Permission ID is required",
        invalid_type_error: "Permission ID must be a string",
      })
      .uuid("Invalid Permission ID format"),
  }),
  body: z.object({
    alias: z
      .string({
        invalid_type_error: "Alias must be a string",
      })
      .min(1, "Alias cannot be empty")
      .optional(),
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .min(1, "Name cannot be empty")
      .optional(),
    isActive: z
      .boolean({
        invalid_type_error: "isActive must be a boolean",
      })
      .optional(),
  }),
});

export default {
  createPermissionSchema,
  updatePermissionSchema,
};
