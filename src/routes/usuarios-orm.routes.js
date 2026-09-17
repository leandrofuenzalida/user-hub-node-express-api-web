import { Router } from "express";
import {
  listarUsuariosOrm,
  obtenerUsuarioRelacionado,
  obtenerUsuarioConPedidosController,
  obtenerDetalleUsuarioController,
} from "../controllers/usuarios-orm.controller.js";

const router = Router();

router.get("/", listarUsuariosOrm);
router.get("/:id/relaciones", obtenerUsuarioRelacionado);
router.get("/:id/pedidos", obtenerUsuarioConPedidosController);
router.get("/:id/detalle", obtenerDetalleUsuarioController);

export default router;
