import { Router } from 'express';
import { Song } from './models/song.model.js';

const router = Router();

// GET /api/songs - Obtener todas las canciones
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

// GET /api/songs/:id - Obtener una canción por ID
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

// POST /api/songs - Crear nueva canción
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

// PUT /api/songs/:id - Actualizar canción
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

// DELETE /api/songs/:id - Eliminar canción
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

// PATCH /api/songs/:id/play - Incrementar reproducciones
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