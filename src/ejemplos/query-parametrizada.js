import "dotenv/config";
import { pool } from "../config/database.js";

const id = 3;

try {
  const resultado = await pool.query(
    `
    SELECT
    id,
    nombre,
    correo,
    activo
    FROM usuarios
    WHERE activo = $1
    AND nombre ILIKE $2;`,
    [true, "%ana%"],
  );

  console.table(resultado.rows);
} catch (error) {
  console.error(error.message);
} finally {
  await pool.end();
}
