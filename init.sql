CREATE TABLE "clientes" (
  "cliente_id" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE,
  "password" varchar(255)
);

CREATE TABLE "formularios" (
  "formulario_id" SERIAL PRIMARY KEY,
  "cliente_id" INTEGER,
  "usuario_id" varchar(255),
  "urlWeb" varchar(255),
  CONSTRAINT "FK_formulario.cliente_id"
    FOREIGN KEY ("cliente_id")
      REFERENCES "clientes"("cliente_id")
);

CREATE TABLE "categorias" (
  "categoria_id" SERIAL PRIMARY KEY,
  "formulario_id" INTEGER,
  "nombre" varchar(128),
  CONSTRAINT "FK_categorias.formulario_id"
    FOREIGN KEY ("formulario_id")
      REFERENCES "formularios"("formulario_id")
);

CREATE TABLE "respuestas" (
  "respuesta_id" SERIAL PRIMARY KEY,
  "formulario_id" INTEGER,
  "contenido" varchar(4000),
  "categoria_id" INTEGER,
  CONSTRAINT "FK_respuestas.formulario_id"
    FOREIGN KEY ("formulario_id")
      REFERENCES "formularios"("formulario_id")
);

INSERT INTO clientes(email, password) VALUES('test@gmail.com', 'passwd');