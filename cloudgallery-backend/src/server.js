import pool from './config/database.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3333;

// Teste de conexão MySQL
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ MySQL connected successfully');
  } catch (error) {
    console.error('❌ MySQL connection error:', error.message);
  }
})();

app.listen(PORT, () => {
  console.log(`🚀 CloudGallery API running on port ${PORT}`);
});

