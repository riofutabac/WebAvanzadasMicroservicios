# 🎵 Microservicio CRUD Canciones

Microservicio desarrollado con Node.js, Express y Sequelize que proporciona operaciones CRUD completas para la gestión de canciones, incluyendo un sistema de conteo de reproducciones.

## 📋 Características

- ✅ CRUD completo para canciones (Crear, Leer, Actualizar, Eliminar)
- ✅ Sistema de conteo de reproducciones
- ✅ Soporte para SQLite (desarrollo) y PostgreSQL (producción)
- ✅ API RESTful con respuestas JSON estructuradas
- ✅ Contenedorizado con Docker
- ✅ Listo para despliegue en Render
- ✅ Manejo de errores robusto
- ✅ Logging de requests
- ✅ Healthcheck incluido

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker (opcional, para contenedores)

### Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd crud-canciones
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env según tus necesidades
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Acceder a la API**
   ```
   http://localhost:3000
   ```

## 🐳 Docker

### Construcción y ejecución
```bash
# Construir imagen
docker build -t crud-canciones .

# Ejecutar contenedor
docker run -p 3000:3000 -e NODE_ENV=production crud-canciones
```

## 📊 API Endpoints

### Información General
```http
GET /
```
Respuesta: Información del microservicio y endpoints disponibles

### Gestión de Canciones

#### Obtener todas las canciones
```http
GET /api/songs
```

#### Obtener canción por ID
```http
GET /api/songs/{id}
```

#### Crear nueva canción
```http
POST /api/songs
Content-Type: application/json

{
  \"name\": \"Nombre de la canción\",
  \"path\": \"https://ejemplo.com/cancion.mp3\",
  \"plays\": 0
}
```

#### Actualizar canción
```http
PUT /api/songs/{id}
Content-Type: application/json

{
  \"name\": \"Nuevo nombre\",
  \"path\": \"https://ejemplo.com/nueva-cancion.mp3\",
  \"plays\": 100
}
```

#### Eliminar canción
```http
DELETE /api/songs/{id}
```

#### Incrementar reproducciones
```http
PATCH /api/songs/{id}/play
```

### Ejemplos de Respuesta

#### Éxito
```json
{
  \"success\": true,
  \"data\": {
    \"id\": 1,
    \"name\": \"Imagine\",
    \"path\": \"https://music.example.com/imagine.mp3\",
    \"plays\": 1500
  },
  \"message\": \"Operación exitosa\"
}
```

#### Error
```json
{
  \"success\": false,
  \"error\": \"Canción no encontrada\",
  \"details\": \"No existe una canción con ID 999\"
}
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DB_CLIENT` | Cliente de base de datos | `sqlite` |
| `DB_FILE` | Archivo SQLite (solo desarrollo) | `database.sqlite` |
| `DATABASE_URL` | URL de PostgreSQL (producción) | - |

### Configuración para Desarrollo
```env
PORT=3000
DB_CLIENT=sqlite
DB_FILE=database.sqlite
NODE_ENV=development
```

### Configuración para Producción con PostgreSQL (Render)
```env
PORT=3000
DB_CLIENT=postgres
DATABASE_URL=postgres://user:pass@host:5432/db
NODE_ENV=production
```

### Configuración para Producción con SQLite Persistente (Render)
```env
PORT=3000
DB_CLIENT=sqlite
DB_FILE=/var/data/database.sqlite
NODE_ENV=production
```

## 🚀 Despliegue en Render

### 1. Preparar Repositorio
```bash
# Inicializar repositorio Git
git init
git add .
git commit -m "Microservicio CRUD Canciones listo"

# Conectar con tu repositorio GitHub
git remote add origin https://github.com/riofutabac/WebAvanzadasMicroservicios.git
git branch -M main
git push -u origin main
```

### 2. Crear Web Service en Render
1. Conectar repositorio de GitHub
2. Configurar:
   - **Name**: `api-canciones-crud`
   - **Environment**: `Docker`
   - **Instance Type**: `Free`
   - **Region**: Seleccionar la más cercana

### 3. Configurar Variables de Entorno
En el panel de Render, agregar:
```
DB_CLIENT=postgres
DATABASE_URL=[URL proporcionada por Render PostgreSQL]
NODE_ENV=production
```

### 4. Configurar Base de Datos PostgreSQL
1. Crear servicio PostgreSQL en Render
2. Copiar la `DATABASE_URL`
3. **IMPORTANTE:** Ejecutar el script de migración desde el Shell de Render:
   ```bash
   # En el panel de Render, ir a Shell y ejecutar:
   psql "$DATABASE_URL" -f migrations/001-init.sql
   ```
   
   Este comando creará la tabla `TBL_SONG` y cargará los datos de ejemplo.

### 5. Configurar Disco Persistente (Opcional)
- **Name**: `data`
- **Mount Path**: `/var/data`
- **Size**: `1 GB`

## 🧪 Pruebas con Postman

### Colección de Pruebas

1. **Obtener todas las canciones**
   - `GET {{base_url}}/api/songs`

2. **Crear canción**
   - `POST {{base_url}}/api/songs`
   - Body (JSON):
     ```json
     {
       \"name\": \"Test Song\",
       \"path\": \"https://example.com/test.mp3\"
     }
     ```

3. **Obtener canción específica**
   - `GET {{base_url}}/api/songs/1`

4. **Actualizar canción**
   - `PUT {{base_url}}/api/songs/1`
   - Body (JSON):
     ```json
     {
       \"name\": \"Updated Song\",
       \"plays\": 50
     }
     ```

5. **Incrementar reproducciones**
   - `PATCH {{base_url}}/api/songs/1/play`

6. **Eliminar canción**
   - `DELETE {{base_url}}/api/songs/1`

### Variables de Entorno Postman
```
base_url: http://localhost:3000 (desarrollo)
base_url: https://tu-app.onrender.com (producción)
```

## 🏗️ Estructura del Proyecto

```
crud-canciones/
├── src/
│   ├── app.js              # Servidor principal
│   ├── routes.js           # Definición de rutas
│   └── models/
│       └── song.model.js   # Modelo Sequelize
├── migrations/
│   └── 001-init.sql        # Script de inicialización BD
├── .env                    # Variables de entorno
├── .gitignore             # Archivos ignorados por Git
├── Dockerfile             # Configuración Docker
├── package.json           # Dependencias y scripts
└── README.md              # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express.js
- **ORM**: Sequelize
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Contenedores**: Docker
- **Despliegue**: Render
- **Validación**: Express built-in + Sequelize validators

## 📝 Scripts Disponibles

```bash
npm start        # Ejecutar en producción
npm run dev      # Ejecutar en desarrollo con nodemon
npm install      # Instalar dependencias
```

## 🔍 Logging y Monitoreo

- Logging básico de requests con timestamp
- Healthcheck endpoint para containers
- Manejo de errores centralizado
- Respuestas estructuradas JSON

## 🚨 Manejo de Errores

El microservicio incluye manejo robusto de errores:
- Validación de datos de entrada
- Manejo de errores de base de datos
- Respuestas HTTP apropiadas
- Logging de errores para debugging

## 📋 Checklist de Despliegue

- [ ] ✅ Código subido a GitHub
- [ ] ✅ Web Service creado en Render
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Base de datos PostgreSQL configurada
- [ ] ✅ Script SQL ejecutado
- [ ] ✅ API funcionando correctamente
- [ ] ✅ Pruebas con Postman completadas
- [ ] ✅ Capturas de pantalla tomadas
- [ ] ✅ Documentación completa

## 📞 Soporte

Para reportar problemas o sugerir mejoras, crear un issue en el repositorio de GitHub.

---

**Desarrollado para el laboratorio de Microservicios**
