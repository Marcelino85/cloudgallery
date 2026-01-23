import pool from '../config/database.js';

/**
 * Criar álbum
 */
export const createAlbum = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  if (!title) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }

  try {
    await pool.query(
      'INSERT INTO albums (title, description, user_id) VALUES (?, ?, ?)',
      [title, description || null, userId]
    );

    return res.status(201).json({ message: 'Álbum criado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar álbum' });
  }
};

/**
 * Listar álbuns do usuário
 */
export const listAlbums = async (req, res) => {
  const userId = req.userId;

  try {
    const [albums] = await pool.query(
      'SELECT id, title, description, created_at FROM albums WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    return res.json(albums);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar álbuns' });
  }
};

/**
 * Editar álbum
 */
export const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const [result] = await pool.query(
      'UPDATE albums SET title = ?, description = ? WHERE id = ? AND user_id = ?',
      [title, description, id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }

    return res.json({ message: 'Álbum atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar álbum' });
  }
};

/**
 * Excluir álbum (somente se estiver vazio)
 */
export const deleteAlbum = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const [photos] = await pool.query(
      'SELECT id FROM photos WHERE album_id = ?',
      [id]
    );

    if (photos.length > 0) {
      return res.status(400).json({
        message: 'Não é possível excluir um álbum que contém fotos'
      });
    }

    const [result] = await pool.query(
      'DELETE FROM albums WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }

    return res.json({ message: 'Álbum excluído com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir álbum' });
  }
};

/**
 * Buscar álbum por ID
 */
export const getAlbumById = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const [albums] = await pool.query(
      `SELECT id, title, description, created_at
       FROM albums
       WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    if (albums.length === 0) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }

    return res.json(albums[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar álbum' });
  }
};
