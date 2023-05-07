import { Sequelize } from "sequelize";

const sequelize = new Sequelize("test", "api_user", "Str0ng!ApiPassword123", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
});

export default sequelize;
