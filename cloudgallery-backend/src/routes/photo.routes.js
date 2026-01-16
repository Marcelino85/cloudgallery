import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../config/upload.js';
import {
  uploadPhoto,
  listPhotos,
  deletePhoto
} from '../controllers/photoController.js';

const router = Router();

router.use(authMiddleware);

router.get('/:albumId', listPhotos);
router.post('/:albumId', upload.single('photo'), uploadPhoto);
router.delete('/:id', deletePhoto);


export default router;
