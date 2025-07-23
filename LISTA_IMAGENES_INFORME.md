# 📷 Lista de Imágenes para el Informe LaTeX

## Imágenes Requeridas para Completar el Informe

### 🏛️ **Logo de la Institución**
**Archivo:** `logo_epn.png`
- **Descripción:** Logo oficial de la Escuela Politécnica Nacional
- **Tamaño:** 300x300px (aproximadamente)
- **Formato:** PNG con fondo transparente
- **Ubicación en informe:** Portada

---

### 🏗️ **Figura 1: Diagrama de Arquitectura**
**Archivo:** `figura1_arquitectura.png`
- **Descripción:** Diagrama que muestre la arquitectura del microservicio
- **Elementos a incluir:**
  - Cliente (navegador/Postman)
  - Flecha hacia API REST (Node.js + Express)
  - Flecha hacia Base de Datos (SQLite/PostgreSQL)
  - Docker container envolviendo la aplicación
- **Herramientas sugeridas:** Draw.io, Lucidchart, o crear con PowerPoint
- **Tamaño:** 1200x800px mínimo
- **Ubicación en informe:** Sección 4 - Diseño y Arquitectura

---

### 🗄️ **Figura 2: Ejecución Script SQL en Render**
**Archivo:** `figura2_render_sql.png`
- **Descripción:** Captura del Shell de Render ejecutando el script de inicialización
- **Qué capturar:**
  1. Ir a tu servicio en Render.com
  2. Abrir la pestaña "Shell"
  3. Ejecutar: `psql "$DATABASE_URL" -f migrations/001-init.sql`
  4. Capturar la pantalla mostrando los mensajes "INSERT 0 10" o "Tabla creada"
- **Asegúrate de mostrar:** URL de Render, comando ejecutado y resultado exitoso
- **Ubicación en informe:** Sección 6 - Base de Datos

---

### 🧪 **Figura 3: Postman GET Local**
**Archivo:** `figura3_postman_local_get.png`
- **Descripción:** Prueba GET /api/songs en localhost
- **Configuración Postman:**
  - **URL:** `http://localhost:3000/api/songs` (o puerto 3001 si usas Docker)
  - **Método:** GET
  - **Headers:** Content-Type: application/json
- **Qué debe mostrar:**
  - URL completa visible
  - Status 200 OK
  - Response body con array de canciones
  - Tiempo de respuesta
- **Ubicación en informe:** Sección 7 - Pruebas Locales

---

### ✅ **Figura 4: Postman POST Local**
**Archivo:** `figura4_postman_local_post.png`
- **Descripción:** Creación exitosa de canción en localhost
- **Configuración Postman:**
  - **URL:** `http://localhost:3000/api/songs`
  - **Método:** POST
  - **Body (raw JSON):**
    ```json
    {
      "name": "Test Song",
      "path": "https://example.com/test.mp3",
      "plays": 0
    }
    ```
- **Qué debe mostrar:**
  - Status 201 Created
  - Response con la canción creada (incluyendo ID asignado)
  - Body de la request visible
- **Ubicación en informe:** Sección 7 - Pruebas Locales

---

### 🐳 **Figura 5: Docker Compose Ejecutándose**
**Archivo:** `figura5_docker_compose.png`
- **Descripción:** Terminal mostrando contenedor activo
- **Comandos a ejecutar y capturar:**
  ```bash
  cd crud-canciones
  docker-compose ps
  ```
- **Qué debe mostrar:**
  - Nombre del contenedor: crud-canciones-app
  - Status: "Up X seconds (healthy)" o similar
  - Puerto: 0.0.0.0:3001->3000/tcp
- **Alternativa:** También puedes usar `docker ps` si prefieres
- **Ubicación en informe:** Sección 8 - Contenerización

---

### ☁️ **Figura 6: Panel Render Live**
**Archivo:** `figura6_render_live.png`
- **Descripción:** Dashboard de Render mostrando servicio desplegado
- **Qué capturar:**
  1. Ir a render.com → tu servicio
  2. Asegúrate de que muestre status "Live" (verde)
  3. Captura que incluya:
     - Nombre del servicio
     - Status "Live"
     - URL pública del servicio
     - Último deploy timestamp
- **Ubicación en informe:** Sección 9 - Despliegue en Render

---

### ⚙️ **Figura 7: Variables de Entorno Render**
**Archivo:** `figura7_render_env.png`
- **Descripción:** Configuración de environment variables en Render
- **Qué capturar:**
  1. En tu servicio de Render → pestaña "Environment"
  2. Mostrar las variables configuradas:
     - NODE_ENV=production
     - DB_CLIENT=postgres
     - DATABASE_URL=[hidden/encrypted]
- **Nota:** Es normal que DATABASE_URL aparezca ofuscada por seguridad
- **Ubicación en informe:** Sección 9 - Despliegue en Render

---

### 🌐 **Figura 8: Postman GET Público**
**Archivo:** `figura8_postman_publico_get.png`
- **Descripción:** Prueba GET con URL pública de Render
- **Configuración Postman:**
  - **URL:** `https://tu-servicio.onrender.com/api/songs`
  - **Método:** GET
- **Qué debe mostrar:**
  - URL pública de Render visible y completa
  - Status 200 OK
  - Response con datos de la base de datos PostgreSQL
  - Certificado SSL válido (candado verde en URL)
- **Ubicación en informe:** Sección 10 - Pruebas Públicas

---

### 🚀 **Figura 9: Postman POST Público**
**Archivo:** `figura9_postman_publico_post.png`
- **Descripción:** Creación de canción en URL pública
- **Configuración Postman:**
  - **URL:** `https://tu-servicio.onrender.com/api/songs`
  - **Método:** POST
  - **Body (raw JSON):**
    ```json
    {
      "name": "Canción Pública",
      "path": "https://music.example.com/publica.mp3",
      "plays": 0
    }
    ```
- **Qué debe mostrar:**
  - Status 201 Created
  - Response con canción creada
  - URL pública de Render
- **Ubicación en informe:** Sección 10 - Pruebas Públicas

---

## 📝 Notas Importantes

### Resolución y Formato
- **Resolución mínima:** 1000px de ancho
- **Formato preferido:** PNG
- **Calidad:** Alta definición, texto legible
- **Recorte:** Enfoca en la información relevante, evita capturar toda la pantalla

### Datos Sensibles
- ✅ **Mostrar:** URLs públicas, nombres de servicios, status codes
- ❌ **Ocultar:** Passwords, tokens, claves API privadas
- ⚠️ **DATABASE_URL en Render aparecerá censurada automáticamente**

### Orden de Captura Recomendado
1. **Primero:** Ejecuta todo localmente y captura figuras 3, 4, 5
2. **Segundo:** Despliega en Render y captura figuras 6, 7
3. **Tercero:** Prueba públicamente y captura figuras 8, 9
4. **Cuarto:** Crea diagrama de arquitectura (figura 1)
5. **Quinto:** Ejecuta script SQL en Render (figura 2)

### Compilación Final
Una vez tengas todas las imágenes en la carpeta del proyecto:

```bash
# Compilar LaTeX
pdflatex informe_microservicio_crud_canciones.tex
pdflatex informe_microservicio_crud_canciones.tex

# El resultado será:
# informe_microservicio_crud_canciones.pdf
```

---

**¡El informe está listo! Solo faltan las capturas para completar la documentación completa del laboratorio.**