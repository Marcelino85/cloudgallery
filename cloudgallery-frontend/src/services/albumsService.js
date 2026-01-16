import api from '../api/api';

export async function getAlbums() {
  const response = await api.get('/albums');
  return response.data;
}

export async function createAlbum(data) {
  const response = await api.post('/albums', data);
  return response.data;
}