import z from "zod";

const createRolePermissionSchema = z.object({
  body: z.object({
    roleId: z
      .string({
        required_error: "Role ID is required",
        invalid_type_error: "Role ID must be a string",
      })
      .uuid("Invalid Role ID format"),
    permissionId: z
      .string({
        required_error: "Permission ID is required",
        invalid_type_error: "Permission ID must be a string",
      })
      .uuid("Invalid Permission ID format"),
  }),
});

const deleteRolePermissionSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "RolePermission ID is required",
        invalid_type_error: "RolePermission ID must be a string",
      })
      .uuid("Invalid RolePermission ID format"),
  }),
});

export default {
  createRolePermissionSchema,
  deleteRolePermissionSchema,
};
