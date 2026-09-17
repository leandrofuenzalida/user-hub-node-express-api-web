import "dotenv/config";
import { sequelize } from "../config/sequelize.js";
import { Usuario } from "../models/Usuario.js";

try {
  //   const usuarios = await Usuario.findAll({
  //     attributes: ["id", "nombre", "correo", "activo"],
  //     order: [["id", "ASC"]],
  //     limit: 10,
  //     logging: console.log,
  //   });

  const usuario = await Usuario.findByPk(2);

  await usuario.update({
    activo: false,
  });
  console.log(usuario.toJSON());
  //   console.table(usuarios.map((usuario) => usuario.toJSON()));
} catch (error) {
  console.error(error.message);
} finally {
  await sequelize.close();
}
