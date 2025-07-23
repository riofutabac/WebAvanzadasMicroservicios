import { Router } from 'express';
import { Song } from './models/song.model.js';

const router = Router();

/**
 * @swagger
 * /api/songs:
 *   get:
 *     tags: [Songs]
 *     summary: Obtener todas las canciones
 *     description: Retorna una lista completa de todas las canciones almacenadas en la base de datos
 *     responses:
 *       200:
 *         description: Lista de canciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Song'
 *                     count:
 *                       type: integer
 *                       example: 10
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.findAll({
      order: [['id', 'ASC']]
    });
    res.json({
      success: true,
      data: songs,
      count: songs.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener las canciones',
      details: error.message
    });
  }
});

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     tags: [Songs]
 *     summary: Obtener una canción por ID
 *     description: Retorna los detalles de una canción específica usando su identificador único
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la canción
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Canción encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Song'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({
        success: false,
        error: 'Canción no encontrada'
      });
    }
    res.json({
      success: true,
      data: song
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener la canción',
      details: error.message
    });
  }
});

/**
 * @swagger
 * /api/songs:
 *   post:
 *     tags: [Songs]
 *     summary: Crear nueva canción
 *     description: Crea una nueva canción en la base de datos con la información proporcionada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SongInput'
 *           example:
 *             name: "Hotel California"
 *             path: "https://music.example.com/hotel-california.mp3"
 *             plays: 0
 *     responses:
 *       201:
 *         description: Canción creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Song'
 *                     message:
 *                       example: "Canción creada exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.post('/songs', async (req, res) => {
  try {
    const { name, path, plays = 0 } = req.body;
    
    if (!name || !path) {
      return res.status(400).json({
        success: false,
        error: 'Los campos name y path son obligatorios'
      });
    }

    const song = await Song.create({
      name,
      path,
      plays: parseInt(plays) || 0
    });

    res.status(201).json({
      success: true,
      data: song,
      message: 'Canción creada exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error al crear la canción',
      details: error.message
    });
  }
});

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     tags: [Songs]
 *     summary: Actualizar canción completa
 *     description: Actualiza todos los campos de una canción existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la canción a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SongUpdate'
 *           example:
 *             name: "Stairway to Heaven (Remastered)"
 *             path: "https://music.example.com/stairway-remastered.mp3"
 *             plays: 3500
 *     responses:
 *       200:
 *         description: Canción actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Song'
 *                     message:
 *                       example: "Canción actualizada exitosamente"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.put('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({
        success: false,
        error: 'Canción no encontrada'
      });
    }

    const { name, path, plays } = req.body;
    const updateData = {};
    
    if (name !== undefined) updateData.name = name;
    if (path !== undefined) updateData.path = path;
    if (plays !== undefined) updateData.plays = parseInt(plays) || 0;

    await song.update(updateData);
    
    res.json({
      success: true,
      data: song,
      message: 'Canción actualizada exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error al actualizar la canción',
      details: error.message
    });
  }
});

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     tags: [Songs]
 *     summary: Eliminar canción
 *     description: Elimina permanentemente una canción de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la canción a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Canción eliminada exitosamente (sin contenido)
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.delete('/songs/:id', async (req, res) => {
  try {
    const deleted = await Song.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Canción no encontrada'
      });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la canción',
      details: error.message
    });
  }
});

/**
 * @swagger
 * /api/songs/{id}/play:
 *   patch:
 *     tags: [Songs]
 *     summary: Incrementar reproducciones
 *     description: Incrementa en 1 el contador de reproducciones de una canción específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único de la canción
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Reproducción registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Song'
 *                     message:
 *                       example: "Reproducción registrada"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.patch('/songs/:id/play', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({
        success: false,
        error: 'Canción no encontrada'
      });
    }

    await song.update({
      plays: song.plays + 1
    });
    
    res.json({
      success: true,
      data: song,
      message: 'Reproducción registrada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al registrar reproducción',
      details: error.message
    });
  }
});

export default router;