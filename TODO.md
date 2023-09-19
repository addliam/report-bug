## Lista de actividades por hacer

Subdividermos entre pendientes de los distintos modulos

### Generales

- Restriccion de autenticacion global en algunos modulos https://docs.nestjs.com/security/authentication#enable-authentication-globally
- En todos los endpoints, control de revision de acceso por JWT.
- El enfoque actual de asignar Categorias a Formularios, requiere 2 solicitudes primero que el FE (FrontEnd) solicite creacion del Formulario y luego asignar categorias con el id asignado. Se puede generar un endpoint que reciba DTO del formulario y DTO categorias para reducir latencia.
- Vincular la IP de la respuesta en un campo `ip` en la tabla Respuestas
- Actualmente se reciben respuestas anonimas se debe limitar solicitudes por IP o agregar un switch que controle el Cliente de autenticacion al responder los formularios.
- El archivo `init.sql` no considera created_at pero el ORM si, quiza sea necesario agregar al script

#### Formulario

- `get by cliente id` debe ser reemplazado por un endpoint generico que revise el id del JWT
- al asignar categorias si ya existe el par formulario_id con categoria_id no se deberia crear nuevo, modificar script para clave unica compuesta
- Quiza gregar un campo `nombre` para que sea mas descriptivo para que recurso esta creando el formulario

#### Categoria

- ~~Agregar campo `cliente_id` que represente el autor de la entidad y permitir que cada Cliente gestione sus propias Categorias~~
