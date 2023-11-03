-- TODO: agregar constraints unique y not null según corresponda
CREATE DATABASE reportbug
GO
USE reportbug;
CREATE TABLE clientes (
  cliente_id INT PRIMARY KEY IDENTITY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  usuario VARCHAR(255) UNIQUE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE formularios (
  formulario_id INT PRIMARY KEY IDENTITY,
  cliente_id INT NOT NULL,
  slug VARCHAR(255) NOT NULL,
  url_web VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  CONSTRAINT FK_formularios_cliente_id
    FOREIGN KEY (cliente_id)
      REFERENCES clientes(cliente_id)
);

CREATE INDEX idx_formularios_slug ON formularios(slug);

CREATE TABLE categorias (
  categoria_id INT PRIMARY KEY IDENTITY,
  cliente_id INT NOT NULL,
  nombre VARCHAR(128) NOT NULL,
  activo BIT DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  CONSTRAINT FK_categorias_cliente_id
    FOREIGN KEY (cliente_id)
      REFERENCES clientes(cliente_id)
);

CREATE TABLE respuestas (
  respuesta_id INT PRIMARY KEY IDENTITY,
  formulario_id INT NOT NULL,
  contenido VARCHAR(4000) NOT NULL,
  categoria_id INT NOT NULL,
  usuario_email VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  CONSTRAINT FK_respuestas_formulario_id
    FOREIGN KEY (formulario_id)
      REFERENCES formularios(formulario_id),
  CONSTRAINT FK_respuestas_categoria_id
    FOREIGN KEY (categoria_id)
      REFERENCES categorias(categoria_id)
);

CREATE TABLE formulario_categorias (
  formulario_categoria_id INT PRIMARY KEY IDENTITY,
  formulario_id INT NOT NULL,
  categoria_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT GETDATE(),
  CONSTRAINT UK_formulario_categoria UNIQUE (formulario_id, categoria_id),
  CONSTRAINT FK_formulario_categorias_categoria_id
    FOREIGN KEY (categoria_id)
      REFERENCES categorias(categoria_id),
  CONSTRAINT FK_formulario_categorias_formulario_id
    FOREIGN KEY (formulario_id)
      REFERENCES formularios(formulario_id)
);

-- password por defecto es "password" 
INSERT INTO clientes(usuario, email, password) VALUES('Test App','test@gmail.com', '$2b$10$G6FQZf2Qg9fBMRYqOHW.1eFx9YrTVWM06A28heBxGXVMueLh33IRG');
INSERT INTO formularios(cliente_id, slug, url_web) VALUES(1, '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000', 'http://google.com');
INSERT INTO categorias(cliente_id, nombre) VALUES(1, 'interfaz');
INSERT INTO categorias(cliente_id, nombre) VALUES(1, 'funcionalidad');
INSERT INTO categorias(cliente_id, nombre) VALUES(1, 'inicio de sesion');
INSERT INTO formulario_categorias(formulario_id, categoria_id) VALUES(1, 2);
INSERT INTO formulario_categorias(formulario_id, categoria_id) VALUES(1, 3);
INSERT INTO respuestas(formulario_id, contenido, categoria_id, usuario_email) VALUES(1, 'No puedo usar la funcionalidad de pagos programados', 2, 'user1@gmail.com');
INSERT INTO respuestas(formulario_id, contenido, categoria_id, usuario_email) VALUES(1, 'No puedo recibir pagos del extranjero', 2, 'user2@gmail.com');

-- Otro usuario, otros datos de ejemplo
INSERT INTO clientes(usuario, email, password) VALUES('Demo App','test2@gmail.com', '$2b$10$G6FQZf2Qg9fBMRYqOHW.1eFx9YrTVWM06A28heBxGXVMueLh33IRG');
INSERT INTO formularios(cliente_id, slug, url_web) VALUES(2, 'dc8c4aefc000-e0b8-42e0-8dcf-11bf5b37', 'http://website.com');
INSERT INTO categorias(cliente_id, nombre) VALUES(2, 'bug');
INSERT INTO categorias(cliente_id, nombre) VALUES(2, 'sugerencia');
INSERT INTO formulario_categorias(formulario_id, categoria_id) VALUES(2, 4);
INSERT INTO formulario_categorias(formulario_id, categoria_id) VALUES(2, 5);
INSERT INTO respuestas(formulario_id, contenido, categoria_id, usuario_email) VALUES(2, 'Cuando inicio sesion en mi mobil la cuenta en la pc se cierra', 4, 'user3@gmail.com');
