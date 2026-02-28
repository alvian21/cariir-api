import db from "./models/index.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

async function check() {
  try {
    const roleId = "6023ce4c-b5ea-432e-90a8-305c11d7e1d3";
    const role = await db.Role.findOne({
      where: { id: roleId },
      include: [
        {
          model: db.Permission,
        }
      ]
    });

    if (!role) {
      console.log("Role tidak ditemukan!");
      process.exit(1);
    }

    console.log("Nama Role:", role.name);
    console.log("Permissions yang dimiliki Role ini:");
    role.Permissions.forEach(p => console.log("- " + p.alias));
    
    // Check if it has access to /role API (role.view, role.create, role.update, role.delete)
    const rolePermissions = role.Permissions.map(p => p.alias);
    const hasRoleAccess = rolePermissions.some(alias => alias.startsWith("role."));
    console.log("\nApakah punya akses ke /role API?", hasRoleAccess ? "YA!" : "TIDAK!");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

check();
