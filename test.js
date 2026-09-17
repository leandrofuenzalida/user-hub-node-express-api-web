// const promesa = new Promise((resolve, reject) => {
//   const operacionCorrecta = false;

//   if (operacionCorrecta) {
//     resolve("Operación completada");
//   } else {
//     reject(new Error("La operación falló"));
//   }
// });

// promesa
//   .then((resultado) => {
//     console.log(resultado);
//   })
//   .catch((error) => {
//     console.error(error.message);
//   });

// console.log("=== Información del proceso ===");
// console.log("PID:", process.pid);
// console.log("Versión de Node:", process.version);
// console.log("Plataforma:", process.platform);
// console.log("Directorio actual:", process.cwd());
// console.log("Argumentos:", process.argv);

// console.log("Inicio");

// process.on("exit", (codigo) => {
//   console.log(`Proceso finalizado con código ${codigo}`);
// });

// console.log("Fin");

// import { leerJson } from "./src/utils/archivos.js";
// import { RUTA_USUARIOS } from "./src/utils/rutas.js";

// export async function obtenerUsuarios() {
//   console.time("lectura-usuarios");

//   const usuarios = await leerJson(RUTA_USUARIOS);

//   console.timeEnd("lectura-usuarios");

//   if (!Array.isArray(usuarios)) {
//     throw new Error("El archivo de usuarios debe contener un arreglo.");
//   }

//   return usuarios;
// }

// obtenerUsuarios();
