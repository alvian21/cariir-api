import pkg from "sequelize";
const { Model } = pkg;
export default (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolePermission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      roleId: DataTypes.UUID,
      permissionId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "RolePermission",
    },
  );
  return RolePermission;
};
