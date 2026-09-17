# Estructura de `src/` — node-express-web-app

Resumen de qué hace cada carpeta del proyecto, archivo por archivo y función por función.

---

## config/

Contiene la configuración inicial que la app necesita antes de arrancar (conexión a la base de datos, variables de entorno y helpers de las vistas).

* `database.js` — configura y expone la conexión a PostgreSQL.
  * `pool`: instancia del pool de conexiones a PostgreSQL.
  * `probarConexion()`: prueba que la conexión funcione al arrancar el servidor.
  * `cerrarPool()`: cierra el pool de conexiones.
* `env.js` — valida que el entorno esté bien configurado.
  * `validarVariablesEntorno()`: revisa que existan las variables de entorno obligatorias (host, nombre de BD, usuario, password) y lanza error si falta alguna.
* `handlebars.js` — registra funciones auxiliares para usar dentro de las vistas `.hbs`.
  * `registrarHelpersHandlebars()`: registra los helpers `sumarUno`, `mayusculas`, `formatearEstado`, `formatearFecha`, `esIgual` y `ocultarCorreo`.

## controllers/

Reciben la petición HTTP y deciden qué responder (JSON o una vista renderizada).

* `database.controller.js` — expone el estado de la base de datos.
  * `mostrarEstadoDatabase()`: responde en JSON el estado de la conexión a PostgreSQL.
* `index.controller.js` — páginas generales del sitio.
  * `mostrarInicio()`: renderiza la página de inicio.
  * `mostrarEstado()`: responde en JSON info del servidor (versión de Node, pid, uptime, ambiente).
  * `acercaDe()`: renderiza la página "acerca del proyecto".
* `usuarios-web.controller.js` — maneja los formularios web de usuarios.
  * `mostrarFormularioNuevoUsuario()`: muestra el formulario vacío para crear un usuario.
  * `crearUsuarioWeb()`: procesa el formulario de creación y redirige a la lista.
  * `mostrarFormularioEditarUsuario()`: muestra el formulario con los datos de un usuario existente.
  * `actualizarUsuarioWeb()`: procesa el formulario de edición.
  * `eliminarUsuarioWeb()`: elimina un usuario desde la web y redirige a la lista.
* `usuarios.controller.js` — controlador de la API REST de usuarios (responde JSON).
  * `listarUsuarios()`: lista usuarios, con filtros opcionales.
  * `buscarUsuario()`: busca un usuario por id.
  * `mostrarUsuarios()`: renderiza la vista con la lista de usuarios (con filtros por nombre/activo).
  * `mostrarUsuario()`: renderiza la vista con el detalle de un usuario.
  * `registrarUsuario()`: crea un usuario vía API.
  * `actualizarUsuario()`: modifica un usuario vía API.
  * `borrarUsuario()`: elimina un usuario vía API.

## data/

Guarda un archivo de datos de respaldo del enfoque antiguo, de cuando los usuarios se guardaban en JSON en vez de PostgreSQL.

* `usuarios.json` — arreglo de usuarios de ejemplo. No contiene funciones, es un remanente de una versión anterior del proyecto.

## ejemplos/

Scripts sueltos de práctica sobre PostgreSQL; no forman parte del flujo real de la app, son para entender la librería `pg`.

* `conexion-client.js` — se conecta con `pg.Client`, hace una query simple y cierra la conexión.
* `conexion-pool.js` — ejemplo de conexión usando `pg.Pool`.
* `conexion-uri.js` — se conecta usando una URI de conexión en vez de parámetros sueltos.
* `cursor-usuarios.js` — usa `pg-cursor` para leer usuarios de a poco (paginado) en vez de traer todo de una vez.
* `lectura-await.js` — ejemplo de lectura con `async/await`.
* `probar-repository.js` — prueba manual del `usuarios.repository.js`.
* `probar-usuarios.js` — prueba manual relacionada a usuarios.
* `query-parametrizada.js` — muestra cómo hacer queries con parámetros (`$1`, `$2`) para evitar inyección SQL.
* `query-pool.js` — ejemplo de query usando el pool de conexiones.

## middlewares/

Funciones que se ejecutan antes de llegar al controlador, en cada request.

* `agregarContextoPeticion.js` — agrega info de contexto a la petición.
  * `agregarContextoPeticion()`: agrega un timestamp (`req.requestTime`) a cada request.
* `agregarDatosVista.js` — deja datos disponibles para las vistas.
  * `agregarDatosVista()`: setea `res.locals.rutaActual` y `res.locals.requestTime`.
* `manejarErrores.js` — maneja los errores de forma centralizada.
  * `manejarErrores()`: captura cualquier error y responde en HTML o JSON según corresponda.
* `registrarAcceso.js` — deja registro de los accesos.
  * `registrarAcceso()`: guarda un log de accesos (fecha, método, URL) en un archivo de texto.
* `rutaNoEncontrada.js` — maneja rutas inexistentes.
  * `rutaNoEncontrada()`: genera un error 404 cuando no existe la ruta pedida.
* `validarIdUsuario.js` — valida el parámetro `:id`.
  * `validarIdUsuario()`: valida que sea un número entero positivo antes de seguir al controlador.

## repositories/

La única capa que habla directo con la base de datos (consultas SQL).

* `usuarios.repository.js` — todas las queries SQL relacionadas a usuarios.
  * `buscarTodos()`: trae todos los usuarios.
  * `buscarPorId(id)`: trae un usuario por su id.
  * `buscarConFiltros({ nombre, activo })`: trae usuarios filtrando por nombre y/o estado activo.
  * `insertar({ nombre, correo, activo })`: crea un usuario nuevo.
  * `actualizar(id, cambios)`: actualiza los campos indicados de un usuario.
  * `eliminar(id)`: borra un usuario por su id.

## routes/

Define qué URL dispara qué controlador.

* `index.routes.js` — rutas generales del sitio.
  * `GET /`: llama a `mostrarInicio()`.
  * `GET /status`: llama a `mostrarEstado()`.
* `usuarios.routes.js` — API REST bajo `/api/usuarios`.
  * `GET /`: `listarUsuarios()`.
  * `POST /`: `registrarUsuario()`.
  * `GET /:id`: `validarIdUsuario()` + `buscarUsuario()`.
  * `PUT /:id`: `validarIdUsuario()` + `actualizarUsuario()`.
  * `DELETE /:id`: `validarIdUsuario()` + `borrarUsuario()`.
* `web.routes.js` — rutas web con formularios.
  * `GET /usuarios`: `mostrarUsuarios()`.
  * `POST /usuarios`: `crearUsuarioWeb()`.
  * `GET /usuarios/nuevo`: `mostrarFormularioNuevoUsuario()`.
  * `GET /usuarios/:id`: `mostrarUsuario()`.
  * `GET /usuarios/:id/editar`: `mostrarFormularioEditarUsuario()`.
  * `POST /usuarios/:id/editar`: `actualizarUsuarioWeb()`.
  * `POST /usuarios/:id/eliminar`: `eliminarUsuarioWeb()`.
  * `GET /acerca`: `acercaDe()`.
  * `GET /db-status`: `mostrarEstadoDatabase()`.

## services/

Lógica de negocio: valida y normaliza datos entre las rutas/controladores y el repository.

* `usuarios.service.js` — lógica de negocio de usuarios.
  * `obtenerUsuarios(filtros)`: trae usuarios, aplicando filtros si vienen.
  * `obtenerUsuarioPorId(id)`: valida el id y trae un usuario.
  * `crearUsuario(datos)`: valida nombre/correo/activo y crea el usuario.
  * `modificarUsuario(id, datos)`: valida los cambios y actualiza el usuario.
  * `eliminarUsuario(id)`: valida el id, chequea que exista y lo elimina.
  * `obtenerUsuariosConFiltros(filtros)`: variante de búsqueda con filtros para la API.
  * *(funciones internas `guardarUsuarios`, `generarSiguienteId` y `existeCorreo` quedan definidas pero solo se usan en bloques comentados — restos del enfoque anterior basado en JSON.)*

## utils/

Funciones de apoyo variadas usadas por el resto de la app.

* `archivos.js` — leer/escribir archivos en disco.
  * `leerJson(rutaArchivo)`: lee y parsea un archivo JSON.
  * `escribirJson(rutaArchivo, datos)`: escribe datos como JSON en un archivo.
  * `agregarLinea(rutaArchivo, linea)`: agrega una línea a un archivo de texto (usado en el log de accesos).
* `consola.js` — mensajes coloreados para la terminal (usados por el CLI).
  * `mostrarExito(mensaje)`: imprime en verde.
  * `mostrarError(mensaje)`: imprime en rojo.
  * `mostrarAdvertencia(mensaje)`: imprime en amarillo.
  * `mostrarTitulo(mensaje)`: imprime en azul.
* `errores.js` — helper para errores HTTP.
  * `crearErrorHttp(mensaje, statusCode, detalles)`: crea un error con código HTTP para que lo capture `manejarErrores`.
* `mensajes.js` — textos fijos de la app.
  * `obtenerMensajeInicio(puerto)`: arma el mensaje que se muestra al levantar el servidor.
  * `obtenerMensajeError(error)`: arma un mensaje de texto a partir de un error.
* `rutas.js` — rutas absolutas del proyecto (no exporta funciones, exporta constantes).
  * `RUTA_PUBLIC`, `RUTA_VIEWS`, `RUTA_PARTIALS`, `RUTA_USUARIOS`, `RUTA_LOGS`, `RUTA_LOG_ACCESOS`: ubicaciones calculadas a partir de la carpeta actual, usadas por el resto de la app.
* `validaciones.js` — validaciones y normalización de datos.
  * `normalizarTexto(valor)`: limpia espacios de un texto.
  * `esCorreoValido(correo)`: valida formato de correo con regex.
  * `convertirBooleano(valor)`: convierte `"true"`/`"false"` a booleano real.
  * `validarId(id)`: valida que sea un entero positivo.
  * `validarNombre(nombre)`: valida que tenga al menos 2 caracteres.
  * `validarCorreo(correo)`: valida y normaliza un correo.

## src/ (archivos sueltos, fuera de carpetas)

Puntos de entrada de la aplicación.

* `app.js` — arranca la app web.
  * Configura Express, monta middlewares y rutas, se conecta a la BD, levanta el servidor y maneja el cierre ordenado (`SIGINT`/`SIGTERM`).
* `cli.js` — interfaz de línea de comandos con `yargs`.
  * Comandos `listar`, `buscar`, `crear` y `eliminar` para gestionar usuarios desde la terminal.
* `argumentos.js` — script mínimo de prueba.
  * Solo imprime `process.argv` en consola.

---

### Arquitectura general

Flujo típico de una petición: `routes` → `controllers` (o los controllers web) → `services` (validación/lógica) → `repositories` (SQL) → `config/database.js` (conexión). `middlewares`, `utils` y `config` dan soporte transversal. `ejemplos` y `data` son restos de aprendizaje que no corren en producción.
