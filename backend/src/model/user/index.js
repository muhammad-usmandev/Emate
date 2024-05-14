import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
const UserModel = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING() },
    password: { type: DataTypes.STRING() },
    role: { type: DataTypes.STRING() },
    phone: { type: DataTypes.STRING() },
    address: { type: DataTypes.STRING() },
    location: { type: DataTypes.GEOGRAPHY("POINT", 4326), allowNull: false },
    profilePicture: { type: DataTypes.STRING() },
    about: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);
export default UserModel;
