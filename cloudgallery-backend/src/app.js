import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'CloudGallery API is running' });
});


export default app;

