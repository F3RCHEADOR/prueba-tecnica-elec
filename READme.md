# Prueba Tecnica - Gestión Geografica de Colombia

API y aplicacion web para gestionar departamentos y ciudades de Colombia, con autenticación de usuarios.

## Tecnologías

- **Backend:** NestJS + TypeScript + TypeORM + PostgreSQL
- **Frontend:** NextJS + TypeScript + Tailwind + Axios + Shadcn
- **Infraestructura:** Docker + Docker Compose

---

## Levantar el proyecto
```bash
docker-compose up -d --build
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:3001 |
| Backend  | http://localhost:3000 |
| Swagger  | http://localhost:3000/docs |

---

## Variables de entorno

### Backend (`backend/.env`)
```env
DB_HOST=db
DB_PORT=5432
DB_NAME=mydb
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=secretkey123
PORT=3000
```

---

## Cómo usar la aplicación

1. Entra a `http://localhost:3001` — redirige automáticamente al login
2. En el navbar ve a **Usuarios → Crear usuario** y registra un usuario con email y contraseña de mínimo 5 caracteres
3. Inicia sesión desde `http://localhost:3001/login` o con el botón **Iniciar Sesión** del navbar
4. Una vez autenticado podrás crear, listar y editar **departamentos** y **ciudades**
5. **La sesion solo dura 15 minutos** Se debera volver a autentificar despues de ese tiempo.

---

## Decisiones tecnicas

- **`whitelist` y `forbidNonWhitelisted`** en el ValidationPipe para rechazar campos no definidos en los DTOs
- **`transform : true`** Esto para que si o si sean tomadas en cuenta los dto
- **bcrypt** para hashear contraseñas — 
- **JWT con expiración de 15 minutos**
- **`onDelete: CASCADE`** — al eliminar un departamento se eliminan sus ciudades
- **`synchronize: true`** en desarrollo para crear tablas automáticamente y ajustarlas segun nesecidades.
- **`Axios` ** mayor control con los fetchs y personalisaciones.  