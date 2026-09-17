import { obtenerUsuarios } from "../services/usuarios.service.js";

export function mostrarInicio(req, res) {
  res.status(200).render("home", {
    titulo: "Node & Express Web App",
    mensaje: "Servidor funcionando correctamente.",
    tecnologias: ["Node.js", "Express", "Handlebars", "File System"],
  });
}

export function mostrarEstado(req, res) {
  res.status(200).json({
    status: "ok",
    message: "Servidor funcionando",
    data: {
      node: process.version,
      pid: process.pid,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      requestTime: req.requestTime,
    },
  });
}

const usuarios = await obtenerUsuarios();

export function acercaDe(req, res) {
  res.render("acerca", {
    titulo: "Acerca del proyecto",
    totalUsuarios: usuarios.length,
    estadoActual: "1.0",
    objetivoProyecto: "Aprender el Uso de Node, Express y Handlebars",
    tecnologias: ["Node.js", "Express", "Handlebars", "File System"],
  });
}
