"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Permissions",
      [
        {
          id: require("crypto").randomUUID(),
          alias: "role.create",
          name: "Tambah Role",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "role.read",
          name: "Lihat Role",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "role.update",
          name: "Ubah Role",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "role.delete",
          name: "Hapus Role",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: require("crypto").randomUUID(),
          alias: "permission.create",
          name: "Tambah Permission",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "permission.read",
          name: "Lihat Permission",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "permission.update",
          name: "Ubah Permission",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "permission.delete",
          name: "Hapus Permission",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: require("crypto").randomUUID(),
          alias: "user.create",
          name: "Tambah User",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "user.read",
          name: "Lihat User",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: require("crypto").randomUUID(),
          alias: "user.update",
          name: "Ubah User",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Permissions", null, {});
  },
};
