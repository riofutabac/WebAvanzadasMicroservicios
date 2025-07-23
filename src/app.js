import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes.js';
import sequelize from './models/song.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: '🎵 Microservicio CRUD Canciones',
    version: '1.0.0',
    status: 'activo',
    endpoints: {
      'GET /api/songs': 'Obtener todas las canciones',
      'GET /api/songs/:id': 'Obtener canción por ID',
      'POST /api/songs': 'Crear nueva canción',
      'PUT /api/songs/:id': 'Actualizar canción',
      'DELETE /api/songs/:id': 'Eliminar canción',
      'PATCH /api/songs/:id/play': 'Incrementar reproducciones'
    }
  });
});

app.use('/api', router);

// Middleware de manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`
  });
});

// Middleware de manejo de errores globales
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// Inicialización del servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente');
    
    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: false });
    console.log('✅ Modelos sincronizados');
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📊 Base de datos: ${process.env.DB_CLIENT || 'sqlite'}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
    
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales del sistema para cierre limpio
process.on('SIGTERM', async () => {
  console.log('🔄 Cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 Cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

startServer();