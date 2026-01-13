import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Backup para garantir que as variáveis cheguem aqui

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Como estou usando Aiven o ssl é Obrigatório
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;

