import { Router } from "express";
import {
  mostrarEstado,
  mostrarInicio,
  acercaDe,
} from "../controllers/index.controller.js";

const router = Router();

router.get("/", mostrarInicio);
router.get("/status", mostrarEstado);
router.get("/acerca", acercaDe);

export default router;
