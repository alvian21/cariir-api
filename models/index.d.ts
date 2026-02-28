// file: models/index.d.ts
import { Model, ModelStatic, Sequelize } from 'sequelize';

export const sequelize: Sequelize;
export const Sequelize: any;

// Daftarkan semua nama model kamu di sini agar dikenali oleh VS Code
export const User: ModelStatic<Model<any, any>>;
export const Role: ModelStatic<Model<any, any>>;
export const Permission: ModelStatic<Model<any, any>>;
export const RolePermission: ModelStatic<Model<any, any>>;
