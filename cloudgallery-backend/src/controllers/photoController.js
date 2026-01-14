import pool from '../config/database.js';

/**
 * Upload de foto
 */
export const uploadPhoto = async (req, res) => {
  const { title, description, acquisition_date, dominant_color } = req.body;
  const { albumId } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'Arquivo não enviado' });
  }

  try {
    const size = req.file.size; // bytes
    const filePath = req.file.path;

    await pool.query(
      `INSERT INTO photos 
        (title, description, acquisition_date, size, dominant_color, file_path, album_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title || null,
        description || null,
        acquisition_date || null,
        size,
        dominant_color || null,
        filePath,
        albumId
      ]
    );

    return res.status(201).json({ message: 'Foto enviada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao enviar foto' });
  }
};

/**
 * Listar fotos do álbum
 */
export const listPhotos = async (req, res) => {
  const { albumId } = req.params;

  try {
    const [photos] = await pool.query(
      `SELECT 
        id, title, description, acquisition_date, size, dominant_color, file_path, created_at
       FROM photos
       WHERE album_id = ?
       ORDER BY acquisition_date DESC`,
      [albumId]
    );

    return res.json(photos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar fotos' });
  }
};

/**
 * Excluir foto
 */
export const deletePhoto = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM photos WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Foto não encontrada' });
    }

    return res.json({ message: 'Foto excluída com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir foto' });
  }
};
