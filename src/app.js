import "dotenv/config";
import express from "express";
import hbs from "hbs";
import morgan from "morgan";
import { pool, probarConexion } from "./config/database.js";
import { validarVariablesEntorno } from "./config/env.js";
import { registrarHelpersHandlebars } from "./config/handlebars.js";
import { agregarContextoPeticion } from "./middlewares/agregarContextoPeticion.js";
import { agregarDatosVista } from "./middlewares/agregarDatosVista.js";
import { manejarErrores } from "./middlewares/manejarErrores.js";
import { registrarAcceso } from "./middlewares/registrarAcceso.js";
import { rutaNoEncontrada } from "./middlewares/rutaNoEncontrada.js";
import indexRouter from "./routes/index.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import usuariosOrmRouter from "./routes/usuarios-orm.routes.js";
import webRouter from "./routes/web.routes.js";
import { obtenerMensajeInicio } from "./utils/mensajes.js";
import { RUTA_PARTIALS, RUTA_PUBLIC, RUTA_VIEWS } from "./utils/rutas.js";
import pedidosOrmRouter from "./routes/pedidos-orm.routes.js";
import "./models/index.js";
import usuariosV1Router from "./routes/usuarios-v1.routes.js";
import pedidosV1Router from "./routes/pedidos-v1.routes.js";
import authRouter from "./routes/auth.routes.js";
import fileUpload from "express-fileupload";
import uploadRouter from "./routes/upload.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", RUTA_VIEWS);

hbs.registerPartials(RUTA_PARTIALS);
registrarHelpersHandlebars();

app.locals.nombreAplicacion = "Node & Express Web App";
app.locals.anioActual = new Date().getFullYear();

app.use(morgan("dev"));
app.use(agregarContextoPeticion);
app.use(registrarAcceso);
app.use(agregarDatosVista);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static(RUTA_PUBLIC));
app.use(fileUpload());

app.use("/", indexRouter);
app.use("/", webRouter);
app.use("/api/usuarios", usuariosRouter);

app.use("/api/orm/usuarios", usuariosOrmRouter);
app.use("/api/orm/pedidos", pedidosOrmRouter);

app.use("/api/v1/usuarios", usuariosV1Router);
app.use("/api/v1/pedidos", pedidosV1Router);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/upload", uploadRouter);
app.use(rutaNoEncontrada);
app.use(manejarErrores);

validarVariablesEntorno();

try {
  await probarConexion();
} catch (error) {
  console.error("La aplicación no puede iniciar sin base de datos.");

  console.error(error.message);

  process.exitCode = 1;
  throw error;
}

const servidor = app.listen(PORT, () => {
  console.log(obtenerMensajeInicio(PORT));
});

let cerrando = false;

async function cerrarAplicacion(senal) {
  if (cerrando) {
    return;
  }

  cerrando = true;

  console.log(`\nSe recibió ${senal}. Cerrando aplicación...`);

  servidor.close(async (error) => {
    try {
      await pool.end();
      console.log("Pool PostgreSQL cerrado.");
    } catch (dbError) {
      console.error("Error al cerrar PostgreSQL:", dbError.message);

      process.exitCode = 1;
    }

    if (error) {
      console.error("Error al cerrar Express:", error.message);

      process.exitCode = 1;
      return;
    }

    console.log("Aplicación cerrada.");
  });
}

process.on("SIGINT", () => {
  cerrarAplicacion("SIGINT");
});

process.on("SIGTERM", () => {
  cerrarAplicacion("SIGTERM");
});

process.on("SIGINT", () => {
  cerrarServidor("SIGINT");
});

process.on("SIGTERM", () => {
  cerrarServidor("SIGTERM");
});
