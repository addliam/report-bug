-- TODO: agregar constraints unique y not null segun corresponda
CREATE DATABASE reportbug;
\c reportbug;
CREATE TABLE "clientes" (
  "cliente_id" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "usuario" varchar(255) UNIQUE NOT NULL
);

CREATE TABLE "formularios" (
  "formulario_id" SERIAL PRIMARY KEY,
  "cliente_id" INTEGER NOT NULL,
  "slug" varchar(255) NOT NULL,
  "url_web" varchar(255),
  CONSTRAINT "FK_formularios.cliente_id"
    FOREIGN KEY ("cliente_id")
      REFERENCES "clientes"("cliente_id")
);

CREATE TABLE "categorias" (
  "categoria_id" SERIAL PRIMARY KEY,
  "cliente_id" INTEGER NOT NULL,
  "nombre" varchar(128) NOT NULL,
  "activo" BOOLEAN DEFAULT true,
  CONSTRAINT "FK_categorias.cliente_id"
    FOREIGN KEY ("cliente_id")
      REFERENCES "clientes"("cliente_id")
);

CREATE TABLE "respuestas" (
  "respuesta_id" SERIAL PRIMARY KEY,
  "formulario_id" INTEGER NOT NULL,
  "contenido" varchar(4000) NOT NULL,
  "categoria_id" INTEGER NOT NULL,
  CONSTRAINT "FK_respuestas.formulario_id"
    FOREIGN KEY ("formulario_id")
      REFERENCES "formularios"("formulario_id"),
  CONSTRAINT "FK_respuestas.categoria_id"
    FOREIGN KEY ("categoria_id")
      REFERENCES "categorias"("categoria_id")
);

CREATE TABLE "formulario_categorias" (
  "formulario_categoria_id" SERIAL PRIMARY KEY,
  "formulario_id" INTEGER NOT NULL,
  "categoria_id" INTEGER NOT NULL,
  CONSTRAINT "FK_formulario_categorias.categoria_id"
    FOREIGN KEY ("categoria_id")
      REFERENCES "categorias"("categoria_id"),
  CONSTRAINT "FK_formulario_categorias.formulario_id"
    FOREIGN KEY ("formulario_id")
      REFERENCES "formularios"("formulario_id")
);

INSERT INTO clientes(cliente_id, usuario, email, password) VALUES(1, 'Test App','test@gmail.com', 'passwd');
INSERT INTO formularios(cliente_id, slug, url_web) VALUES(1,'11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000', 'http://google.com');
INSERT INTO categorias(cliente_id, nombre) VALUES(1, 'interfaz');
INSERT INTO categorias(cliente_id, nombre) VALUES(1, 'funcionalidad');
INSERT INTO categorias(cliente_id, nombre) VALUES(1, 'inicio de sesion');
INSERT INTO formulario_categorias(formulario_id, categoria_id) VALUES(1, 2);
INSERT INTO formulario_categorias(formulario_id, categoria_id) VALUES(1, 3);
INSERT INTO respuestas(formulario_id, contenido, categoria_id) VALUES(1, 'No puedo usar la funcionalidad de pagos programados', 2);
INSERT INTO respuestas(formulario_id, contenido, categoria_id) VALUES(1, 'No puedo recibir pagos del extranjero', 2);