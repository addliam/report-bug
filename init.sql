-- TODO: agregar constraints unique y not null segun corresponda
CREATE TABLE "clientes" (
  "cliente_id" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE,
  "password" varchar(255),
  "usuario" varchar(255) UNIQUE
);

CREATE TABLE "formularios" (
  "formulario_id" SERIAL PRIMARY KEY,
  "cliente_id" INTEGER,
  "slug" varchar(255),
  "url_web" varchar(255),
  CONSTRAINT "FK_formularios.cliente_id"
    FOREIGN KEY ("cliente_id")
      REFERENCES "clientes"("cliente_id")
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

CREATE TABLE "categorias" (
  "categoria_id" SERIAL PRIMARY KEY,
  "formulario_id" INTEGER,
  "nombre" varchar(128),
  CONSTRAINT "FK_categorias.formulario_id"
    FOREIGN KEY ("formulario_id")
      REFERENCES "formularios"("formulario_id")
);


INSERT INTO clientes(usuario, email, password) VALUES('test001','test@gmail.com', 'passwd');
INSERT INTO formularios(cliente_id, slug, url_web) VALUES(1,'11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000', 'http://google.com');
