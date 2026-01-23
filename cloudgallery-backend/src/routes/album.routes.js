import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createAlbum,
  listAlbums,
  updateAlbum,
  deleteAlbum,
  getAlbumById
} from '../controllers/albumController.js';


const router = Router();

router.use(authMiddleware);

router.post('/', createAlbum);
router.get('/', listAlbums);
router.get('/:id', getAlbumById);
router.put('/:id', updateAlbum);
router.delete('/:id', deleteAlbum);

export default router;
