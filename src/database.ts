import { Sequelize } from "sequelize";
import env from "./env";

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_USER_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

export default sequelize;
