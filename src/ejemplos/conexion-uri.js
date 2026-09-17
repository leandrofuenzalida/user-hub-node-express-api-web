import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

try {
  await client.connect();

  const resultado = await client.query("SELECT CURRENT_DATABASE() AS database");

  console.table(resultado.rows);
} finally {
  await client.end();
}
