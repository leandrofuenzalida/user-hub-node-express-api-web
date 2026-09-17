import "dotenv/config";
import { sequelize, probarSequelize } from "../config/sequelize.js";

try {
  await probarSequelize();
} catch (error) {
  console.error(error.message);
} finally {
  await sequelize.close();
}
