import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloudgalleryapi.onrender.com', // ajuste se necessário
});

// Interceptor para token (entra depois que o AuthContext existir)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

//Com esse arquivo, podemos fazer requisições HTTP para o backend de forma centralizada, 
// facilitando a manutenção e o gerenciamento das chamadas à API.