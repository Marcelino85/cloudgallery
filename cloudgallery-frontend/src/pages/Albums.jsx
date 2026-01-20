import { useEffect, useState } from 'react';
import { SimpleGrid, Button, Box, Container, Heading, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';
import CreateAlbumModal from '../components/CreateAlbumModal';
import { getAlbums } from '../services/albumsService';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { loadAlbums(); }, []);

  async function loadAlbums() {
    const data = await getAlbums();
    setAlbums(data);
  }

  return (
    <Box minH="100vh" bg="slate.50">
      <Header />
      <Container maxW="container.xl" pb={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg" color="blue.900">Meus álbuns</Heading>
          <Button colorPalette="blue" size="lg" onClick={() => setIsModalOpen(true)}>
            + Criar novo álbum
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
          {albums.map(album => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </SimpleGrid>
      </Container>

      <CreateAlbumModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={loadAlbums}
      />
    </Box>
  );
}