import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Spinner,
} from '@chakra-ui/react';
import api from '../api/api';

export default function AlbumDetails() {
  const { id: albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const response = await api.get(`/photos/${albumId}`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Erro ao buscar fotos', error);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, [albumId]);

  if (loading) {
    return (
      <Box p={8}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Fotos do Álbum</Heading>

      {photos.length === 0 ? (
        <Text>Nenhuma foto cadastrada neste álbum.</Text>
      ) : (
        <SimpleGrid columns={[2, 3, 4]} spacing={4}>
          {photos.map((photo) => (
            <Box key={photo.id} borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image
                src={`http://localhost:3333/uploads/${photo.file_path}`}
                alt={photo.title || 'Foto do álbum'}
                objectFit="cover"
                h="150px"
                w="100%"
                cursor="pointer"
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
