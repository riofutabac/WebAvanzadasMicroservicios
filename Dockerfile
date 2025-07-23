# Dockerfile para Microservicio CRUD Canciones
# Usa imagen oficial de Node.js LTS
FROM node:20-alpine

# Instalar dependencias del sistema necesarias para SQLite y PostgreSQL
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    sqlite \
    postgresql-client

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --omit=dev && npm cache clean --force

# Copiar código fuente
COPY . .

# Crear directorio para datos persistentes
RUN mkdir -p /var/data

# Configurar variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Exponer puerto
EXPOSE 3000

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Cambiar permisos de directorios necesarios
RUN chown -R nodejs:nodejs /app /var/data

# Cambiar a usuario no-root
USER nodejs

# Comando de inicio con manejo de señales
CMD ["node", "src/app.js"]

# Healthcheck para verificar que la aplicación esté funcionando
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"