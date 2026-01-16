import { useEffect, useState } from 'react';
import {
  SimpleGrid,
  Button,
  Box,
} from '@chakra-ui/react';

import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import CreateAlbumModal from '../components/CreateAlbumModal';
import { getAlbums } from '../services/albumsService';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    loadAlbums();
  }, []);

  async function loadAlbums() {
    const data = await getAlbums();
    setAlbums(data);
  }

  return (
    <Box p={6}>
      <Header />

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </SimpleGrid>

      <Box mt={8} textAlign="right">
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Criar novo álbum
        </Button>
      </Box>

      <CreateAlbumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={loadAlbums}
      />
    </Box>
  );
}
