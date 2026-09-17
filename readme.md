# Node & Express Web App

API RESTful escalable con Node.js, Express, PostgreSQL y autenticación JWT

## 📋 Descripción

Aplicación web backend desarrollada con **Node.js** y **Express**, implementando buenas prácticas de desarrollo moderno. El proyecto integra autenticación JWT, persistencia en base de datos relacional con Sequelize ORM, subida de archivos y estructura modular de rutas, controladores y servicios.

Desarrollado como proyecto incremental para los módulos 6, 7 y 8 de formación backend.

## ✨ Características Principales

- ✅ **Autenticación JWT** - Seguridad en rutas protegidas
- ✅ **Base de datos PostgreSQL** - Persistencia relacional con Sequelize
- ✅ **Operaciones CRUD completas** - Gestión de usuarios y pedidos
- ✅ **Subida de archivos** - Endpoint de upload validado
- ✅ **API RESTful** - Respuestas consistentes y estándar
- ✅ **Rutas públicas y privadas** - Control de acceso
- ✅ **Logging de accesos** - Persistencia en archivos planos
- ✅ **Vistas dinámicas** - Motor Handlebars integrado
- ✅ **Estructura modular** - Fácil de escalar y mantener

## 🚀 Requisitos

- **Node.js** 18.0.0 o superior
- **npm** 9.0.0 o superior
- **PostgreSQL** 12.0 o superior
- Variables de entorno configuradas (.env)

## 📦 Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/TU_USUARIO/node-express-web-app.git
cd node-express-web-app
Instalar dependencias:
npm install
Configurar variables de entorno:
Crear archivo .env basado en .env.example:

cp .env.example .env
Editar .env con tus credenciales:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_base_datos
DB_USER=usuario_postgres
DB_PASSWORD=contraseña
JWT_SECRET=tu_clave_secreta_jwt
Crear base de datos:
psql -U postgres -d tu_base_datos -f ./sql/schema.sql
🏃 Ejecución
Modo desarrollo (con auto-reload):
npm run dev
Modo producción:
npm start
El servidor estará disponible en http://localhost:3000

📁 Estructura del Proyecto
node-express-web-app/
├── src/
│   ├── app.js                    # Configuración principal de Express
│   ├── cli.js                    # Interfaz de línea de comandos
│   ├── config/                   # Configuraciones (BD, env, handlebars)
│   │   ├── database.js           # Conexión PostgreSQL
│   │   ├── env.js                # Validación de variables
│   │   └── handlebars.js         # Helpers de Handlebars
│   ├── controllers/              # Lógica de negocio por ruta
│   │   ├── index.controller.js
│   │   ├── auth.controller.js
│   │   ├── usuarios-v1.controller.js
│   │   ├── pedidos-v1.controller.js
│   │   └── upload.controller.js
│   ├── middlewares/              # Middleware personalizado
│   │   ├── auth.middleware.js    # Protección JWT
│   │   ├── registrarAcceso.js    # Logging de accesos
│   │   ├── manejarErrores.js     # Manejo global de errores
│   │   └── rutaNoEncontrada.js   # Error 404
│   ├── models/                   # Modelos Sequelize
│   │   ├── Usuario.js
│   │   ├── Pedido.js
│   │   ├── Rol.js
│   │   ├── Perfil.js
│   │   ├── UsuarioRol.js
│   │   └── index.js
│   ├── routes/                   # Definición de rutas
│   │   ├── index.routes.js       # Rutas públicas
│   │   ├── auth.routes.js        # Autenticación
│   │   ├── usuarios-v1.routes.js # API v1 Usuarios
│   │   ├── pedidos-v1.routes.js  # API v1 Pedidos
│   │   ├── upload.routes.js      # Subida de archivos
│   │   └── web.routes.js         # Rutas web
│   ├── services/                 # Servicios de negocio
│   │   ├── usuarios-orm.service.js
│   │   ├── pedidos-orm.service.js
│   │   └── auth.service.js
│   ├── repositories/             # Acceso a datos
│   ├── utils/                    # Funciones auxiliares
│   │   ├── mensajes.js
│   │   ├── rutas.js
│   │   └── validaciones.js
│   ├── ejemplos/                 # Datos de ejemplo
│   └── data/                     # Datos persistentes
├── views/                        # Plantillas Handlebars
│   ├── usuarios/
│   ├── partials/                 # Componentes reutilizables
│   └── *.hbs                     # Vistas
├── public/                       # Contenido estático
│   ├── css/
│   ├── js/
│   └── uploads/                  # Archivos subidos
├── logs/
│   └── log.txt                   # Registro de accesos
├── sql/                          # Scripts de base de datos
├── package.json                  # Dependencias y scripts
├── .env.example                  # Ejemplo de variables
├── .gitignore                    # Archivos ignorados
└── README.md                     # Este archivo
🔗 Rutas Principales
Rutas Públicas
Método	Ruta	Descripción
GET	/	Página de inicio
GET	/status	Estado del servidor
GET	/acerca	Información de la aplicación
Autenticación (API v1)
Método	Ruta	Descripción
POST	/api/v1/auth/registro	Registrar nuevo usuario
POST	/api/v1/auth/login	Login y obtener JWT
GET	/api/v1/auth/me	Datos del usuario (protegido)
POST	/api/v1/auth/decode	Decodificar token
Usuarios (API v1)
Método	Ruta	Descripción
GET	/api/v1/usuarios	Listar usuarios
GET	/api/v1/usuarios/:id	Obtener usuario por ID
GET	/api/v1/usuarios/:id/pedidos	Pedidos del usuario
POST	/api/v1/usuarios	Crear usuario (protegido)
PUT	/api/v1/usuarios/:id	Actualizar usuario (protegido)
DELETE	/api/v1/usuarios/:id	Eliminar usuario (protegido)
Pedidos (API v1)
Método	Ruta	Descripción
GET	/api/v1/pedidos	Listar pedidos
GET	/api/v1/pedidos/:id	Obtener pedido por ID
POST	/api/v1/pedidos	Crear pedido (protegido)
PUT	/api/v1/pedidos/:id	Actualizar pedido (protegido)
DELETE	/api/v1/pedidos/:id	Eliminar pedido (protegido)
Subida de Archivos (API v1)
Método	Ruta	Descripción
POST	/api/v1/upload	Subir archivo (protegido)
DELETE	/api/v1/upload/:nombre	Eliminar archivo (protegido)
📝 Ejemplos de Uso
Registro de usuario
curl -X POST http://localhost:3000/api/v1/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
Respuesta exitosa:

{
  "status": "ok",
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
Respuesta:

{
  "status": "ok",
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "usuario": {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com"
    }
  }
}
Listar usuarios (con autenticación)
curl -X GET http://localhost:3000/api/v1/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
Respuesta:

{
  "status": "ok",
  "message": "Usuarios encontrados",
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "links": {
        "self": "/api/v1/usuarios/1",
        "pedidos": "/api/v1/usuarios/1/pedidos"
      }
    }
  ]
}
Crear usuario
curl -X POST http://localhost:3000/api/v1/usuarios \
  -H "Authorization: Bearer TU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@example.com",
    "password": "securePass123"
  }'
Subir archivo
curl -X POST http://localhost:3000/api/v1/upload \
  -H "Authorization: Bearer TU_TOKEN" \
  -F "archivo=@/ruta/a/imagen.jpg"
🔐 Autenticación
La aplicación usa JWT (JSON Web Tokens) para proteger rutas:

El usuario se registra o inicia sesión en /api/v1/auth/registro o /api/v1/auth/login
Recibe un token JWT en la respuesta
Incluye el token en el header Authorization: Bearer <token> para acceder a rutas protegidas
El middleware protegerRuta valida el token en cada petición
Tokens JWT incluyen:

ID del usuario
Email
Timestamp de expiración
Firma digital
📦 Dependencias Principales
{
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-fileupload": "^1.5.2",
    "express-jwt": "^8.5.1",
    "hbs": "^4.2.1",
    "jsonwebtoken": "^9.0.3",
    "morgan": "^1.11.0",
    "pg": "^8.23.0",
    "sequelize": "^6.37.8",
    "yargs": "^18.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
Descripción:

express - Framework web minimalista y flexible
sequelize - ORM para manejar PostgreSQL
pg - Cliente nativo de PostgreSQL
jsonwebtoken - Creación y verificación de JWT
express-jwt - Middleware para validar JWT
dotenv - Carga de variables de entorno
express-fileupload - Manejo de subida de archivos
hbs - Motor de plantillas Handlebars
morgan - Logger HTTP
nodemon - Recarga automática en desarrollo
🎯 Decisiones Técnicas
Por qué src/app.js como archivo principal
Se eligió app.js como punto de entrada porque:

Es la convención estándar en proyectos Express
Contiene la configuración central de la aplicación
Permite separación clara entre configuración e inicialización
Facilita testing al exportar la instancia de Express
Estructura modular en capas
La separación en controllers, services, models y routes permite:

Escalabilidad - Agregar nuevas funcionalidades sin afectar código existente
Mantenibilidad - Código organizado, legible y con responsabilidad única
Testabilidad - Cada capa puede probarse de forma independiente
Reutilización - Servicios compartidos entre múltiples controladores

Ejemplo: Un servicio de usuarios-orm.service.js es usado por controladores de web, API v1 y CLI.

PostgreSQL + Sequelize como ORM
Se optó por base de datos relacional porque:

Datos estructurados - Usuarios y pedidos tienen campos definidos
Relaciones complejas - Soporte nativo para 1:1, 1:N, N:M (usuario-rol)
Integridad referencial - Constraints a nivel de BD
Sequelize abstrae SQL - Escribir queries en JavaScript sin SQL puro

JWT para autenticación
Elegido por:

Stateless - Sin necesidad de guardar sesiones en servidor
Escalable - Funciona en arquitecturas distribuidas/microservicios
Seguro - Tokens firmados, imposibles de falsificar
Mobile-friendly - Perfecto para apps móviles

Handlebars para vistas
Usado para:

Renderizar dinámicamente - Vistas HTML con datos del servidor
Separación clara - Lógica de negocio vs presentación
Helpers reutilizables - Componentes en partials/
Sintaxis simple - Curva de aprendizaje baja

Estructura de carpetas anidadas
En lugar de un único nivel, se usan:

/src/models/ - Independiente del framework
/src/controllers/ - Ligado a Express pero organizado
/src/services/ - Lógica de negocio reutilizable
/src/repositories/ - Acceso a datos en una capa
Esto permite que la lógica de negocio sea portátil a otros contextos (CLI, workers, etc.)

📊 Modelos de Base de Datos
Usuario
┌─────────────────────────────┐
│        Usuario              │
├─────────────────────────────┤
│ id: INT (PK)                │
│ nombre: VARCHAR             │
│ email: VARCHAR (UNIQUE)     │
│ password: VARCHAR           │
│ activo: BOOLEAN             │
│ createdAt: TIMESTAMP        │
│ updatedAt: TIMESTAMP        │
└─────────────────────────────┘
     ↓ 1:N                ↓ N:M
   Pedido              Rol
Relaciones:

Uno a Muchos: Usuario → Pedidos
Muchos a Muchos: Usuario ↔ Rol (a través de UsuarioRol)
Pedido
┌─────────────────────────────┐
│        Pedido               │
├─────────────────────────────┤
│ id: INT (PK)                │
│ usuarioId: INT (FK)         │
│ descripcion: TEXT           │
│ estado: VARCHAR             │
│ total: DECIMAL              │
│ createdAt: TIMESTAMP        │
│ updatedAt: TIMESTAMP        │
└─────────────────────────────┘
Rol
┌─────────────────────────────┐
│        Rol                  │
├─────────────────────────────┤
│ id: INT (PK)                │
│ nombre: VARCHAR (UNIQUE)    │
│ descripcion: TEXT           │
│ createdAt: TIMESTAMP        │
│ updatedAt: TIMESTAMP        │
└─────────────────────────────┘
UsuarioRol (Junction Table)
┌──────────────────────────────┐
│      UsuarioRol              │
├──────────────────────────────┤
│ usuarioId: INT (FK, PK1)     │
│ rolId: INT (FK, PK2)         │
│ asignadoEn: TIMESTAMP        │
└──────────────────────────────┘
Permite que un usuario tenga múltiples roles (Admin, User, Moderator).

🛡️ Seguridad Implementada
✅ Contraseñas hasheadas - Con bcrypt (implementado en auth.service.js)
✅ JWT con expiración - Tokens válidos por tiempo limitado
✅ Validación de entrada - En controladores y servicios
✅ CORS configurado - Si es necesario (middleware Express)
✅ Variables sensibles en .env - Nunca en código
✅ Validación en subida de archivos - Tipo y tamaño
✅ Middleware de errores - Manejo centralizado de excepciones
✅ Logger de accesos - Auditoría en log.txt
📝 Reflexiones Técnicas
Base sólida para producción
Este proyecto representa una base profesional construida con:

Modularidad - Cada componente: responsabilidad única
Escalabilidad - Estructura lista para crecer
Buenas prácticas - Convenciones del ecosistema Node.js
Seguridad - Autenticación, validación, encriptación
Mantenibilidad - Código limpio, documentado, fácil de entender
Decisiones de diseño justificadas
Cada carpeta y archivo tiene razón de ser:

No hay "código mágico" o mal documentado
Las relaciones entre capas son claras
Es fácil onboardear nuevos desarrolladores
Próximos pasos recomendados
Para llevar el proyecto a producción:

Tests - Unitarios y de integración con Jest/Mocha
Validación robusta - Joi o Zod para schemas
Rate limiting - Evitar abuso (express-rate-limit)
Caché - Redis para sesiones y datos frecuentes
Documentación API - Swagger/OpenAPI
Monitoring - Sentry, DataDog o similar
CI/CD - GitHub Actions, GitLab CI
Docker - Containerizar la aplicación
Filosofía del proyecto
Se priorizó:

✅ Claridad sobre cleverness - Código obvio, no ingenioso
✅ Convención sobre configuración - Menos parámetros
✅ KISS - Keep It Simple, Stupid
✅ DRY - Don't Repeat Yourself (servicios reutilizables)
✅ Separation of Concerns - Cada capa su tarea
🤝 Contribuir
Las contribuciones son bienvenidas. Para cambios mayores:

Fork del proyecto
Crear rama: git checkout -b feature/MiFeature
Commit: git commit -m 'Add: Mi nueva feature'
Push: git push origin feature/MiFeature
Pull Request
Estándares de código
Usar nombres descriptivos en inglés
Máximo 80 caracteres por línea
Comentar solo el "por qué", no el "qué"
Funciones pequeñas y enfocadas
📄 Licencia
ISC License - Libre para uso comercial y personal

📞 Contacto
Autor: Leandro Fuenzalida
Email: leandro.fuenzalida@gmail.com
GitHub: https://github.com/TU_USUARIO

📅 Changelog
v1.0.0 - Septiembre 2026
Implementado:

Estructura base con Express
Autenticación JWT
API RESTful v1
PostgreSQL con Sequelize
Subida de archivos
Vistas con Handlebars
Logging de accesos
Documentación completa
```
