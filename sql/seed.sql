INSERT INTO usuarios (
  nombre,
  correo,
  activo
)
VALUES
  (
    'Ana Torres',
    'ana@example.com',
    TRUE
  ),
  (
    'Carlos Soto',
    'carlos@example.com',
    FALSE
  ),
  (
    'Daniela Rojas',
    'daniela@example.com',
    TRUE
  )
ON CONFLICT (correo) DO NOTHING;

INSERT INTO perfiles (
usuario_id,
telefono,
direccion,
fecha_nacimiento
)
VALUES (
2,
'+56 9 1234 5678',
'Av. Providencia 1234, Santiago',
'1996-03-12'
)
ON CONFLICT (usuario_id)
DO NOTHING;



INSERT INTO pedidos (
  usuario_id,
  estado,
  total
)
VALUES
  (
    2,
    'pendiente',
    19990
  ),
  (
    2,
    'pagado',
    45990
  ),
  (
    2,
    'enviado',
    12500
  );


  CREATE TABLE IF NOT EXISTS roles (
  id INTEGER
    GENERATED ALWAYS AS IDENTITY
    PRIMARY KEY,

  nombre VARCHAR(80)
    NOT NULL
    UNIQUE,

  created_at TIMESTAMPTZ
    NOT NULL
    DEFAULT CURRENT_TIMESTAMP,

  updated_at TIMESTAMPTZ
    NOT NULL
    DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS usuario_roles (
  id INTEGER
    GENERATED ALWAYS AS IDENTITY
    PRIMARY KEY,

  usuario_id INTEGER
    NOT NULL
    REFERENCES usuarios(id)
    ON DELETE CASCADE,

  rol_id INTEGER
    NOT NULL
    REFERENCES roles(id)
    ON DELETE CASCADE,

  fecha_asignacion TIMESTAMPTZ
    NOT NULL
    DEFAULT CURRENT_TIMESTAMP,

  asignado_por VARCHAR(120),

  CONSTRAINT usuario_roles_unico
    UNIQUE (
      usuario_id,
      rol_id
    )
);


INSERT INTO roles (
  nombre
)
VALUES
  ('usuario'),
  ('editor'),
  ('administrador')
ON CONFLICT (nombre)
DO NOTHING;


INSERT INTO usuario_roles (
  usuario_id,
  rol_id,
  asignado_por
)
VALUES
  (
    2,
    1,
    'seed'
  ),
  (
    2,
    2,
    'seed'
  )
ON CONFLICT (
  usuario_id,
  rol_id
)
DO NOTHING;