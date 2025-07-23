import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🎵 API CRUD Canciones',
      version: '1.0.0',
      description: `
        **Microservicio RESTful para gestión de canciones**
        
        Este microservicio proporciona operaciones CRUD completas para la gestión de canciones,
        incluyendo un sistema de conteo de reproducciones.
        
        ### Características:
        - ✅ Operaciones CRUD completas
        - ✅ Sistema de conteo de reproducciones  
        - ✅ Base de datos SQLite/PostgreSQL
        - ✅ Respuestas JSON estructuradas
        - ✅ Manejo de errores robusto
        
        ### Desarrollado por:
        **Alexis Jahir Lapo Cabrera** - Escuela Politécnica Nacional
      `,
      contact: {
        name: 'Alexis Jahir Lapo Cabrera',
        email: 'alexis.lapo@epn.edu.ec'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      { 
        url: 'http://localhost:3000', 
        description: 'Servidor de desarrollo local' 
      },
      { 
        url: 'http://localhost:3001', 
        description: 'Servidor Docker local' 
      },
      { 
        url: 'https://api-canciones-crud.onrender.com', 
        description: 'Servidor de producción (Render)' 
      }
    ],
    components: {
      schemas: {
        Song: {
          type: 'object',
          required: ['name', 'path'],
          properties: {
            id: {
              type: 'integer',
              description: 'Identificador único de la canción',
              example: 1
            },
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Nombre de la canción',
              example: 'Imagine'
            },
            path: {
              type: 'string',
              maxLength: 500,
              description: 'URL o ruta del archivo de audio',
              example: 'https://music.example.com/imagine.mp3'
            },
            plays: {
              type: 'integer',
              minimum: 0,
              description: 'Número de reproducciones',
              example: 1500,
              default: 0
            }
          }
        },
        SongInput: {
          type: 'object',
          required: ['name', 'path'],
          properties: {
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Nombre de la canción',
              example: 'Bohemian Rhapsody'
            },
            path: {
              type: 'string',
              maxLength: 500,
              description: 'URL o ruta del archivo de audio',
              example: 'https://music.example.com/bohemian.mp3'
            },
            plays: {
              type: 'integer',
              minimum: 0,
              description: 'Número inicial de reproducciones (opcional)',
              example: 0,
              default: 0
            }
          }
        },
        SongUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              maxLength: 200,
              description: 'Nuevo nombre de la canción',
              example: 'Bohemian Rhapsody (Remastered)'
            },
            path: {
              type: 'string',
              maxLength: 500,
              description: 'Nueva URL o ruta del archivo',
              example: 'https://music.example.com/bohemian-remastered.mp3'
            },
            plays: {
              type: 'integer',
              minimum: 0,
              description: 'Nuevo número de reproducciones',
              example: 2500
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              oneOf: [
                { $ref: '#/components/schemas/Song' },
                { 
                  type: 'array',
                  items: { $ref: '#/components/schemas/Song' }
                }
              ]
            },
            count: {
              type: 'integer',
              description: 'Número de elementos (solo en listados)',
              example: 10
            },
            message: {
              type: 'string',
              description: 'Mensaje descriptivo',
              example: 'Operación exitosa'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Descripción del error',
              example: 'Canción no encontrada'
            },
            details: {
              type: 'string',
              description: 'Detalles técnicos del error',
              example: 'No existe una canción con ID 999'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Recurso no encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        BadRequest: {
          description: 'Solicitud inválida',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        InternalError: {
          description: 'Error interno del servidor',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Songs',
        description: 'Operaciones CRUD para gestión de canciones'
      },
      {
        name: 'Health',
        description: 'Endpoints de salud y estado del servicio'
      }
    ]
  },
  apis: ['./src/routes.js', './src/app.js']
});