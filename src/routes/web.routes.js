import { Router } from "express";
import {
  mostrarUsuario,
  mostrarUsuarios,
} from "../controllers/usuarios.controller.js";
import {
  mostrarFormularioNuevoUsuario,
  crearUsuarioWeb,
  mostrarFormularioEditarUsuario,
  actualizarUsuarioWeb,
  eliminarUsuarioWeb,
} from "../controllers/usuarios-web.controller.js";
import { validarIdUsuario } from "../middlewares/validarIdUsuario.js";
import { acercaDe, mostrarInicio } from "../controllers/index.controller.js";
import { mostrarEstadoDatabase } from "../controllers/database.controller.js";

const router = Router();

router.get("/usuarios", mostrarUsuarios);
router.post("/usuarios", crearUsuarioWeb); // se ejecuta cuando se envia el form

router.get("/usuarios/nuevo", mostrarFormularioNuevoUsuario); // disponibiliza el form en la pagina
router.get("/usuarios/:id", validarIdUsuario, mostrarUsuario);
router.get("/usuarios/:id/editar", mostrarFormularioEditarUsuario);
router.post("/usuarios/:id/editar", actualizarUsuarioWeb);
router.post("/usuarios/:id/eliminar", eliminarUsuarioWeb);
router.get("/db-status", mostrarEstadoDatabase);
export default router;
