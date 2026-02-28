import pkg from "sequelize";
const { Model } = pkg;
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      roleId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
