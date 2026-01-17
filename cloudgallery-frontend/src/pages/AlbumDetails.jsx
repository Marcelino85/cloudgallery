/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  Flex,
  Spinner,
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger
} from '@chakra-ui/react';
import api from '../api/api';
import UploadPhotoModal from '../components/UploadPhotoModal';

export default function AlbumDetails() {
  const { id: albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
   // 🔹 CONTROLE DO MODAL (SUBSTITUI useDisclosure)
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);



 // 🔹 FUNÇÃO PARA BUSCAR FOTOS (USADA TAMBÉM APÓS UPLOAD)
  async function fetchPhotos() {
    try {
      const response = await api.get(`/photos/${albumId}`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
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
        <Flex justify="space-between" align="center" mb={6}>
            <Heading size="md">Fotos do Álbum</Heading>

            {/* 🔹 BOTÃO ABRE O MODAL */}
            <Button
              colorScheme="blue"
              onClick={() => setIsUploadOpen(true)}
            >
              Enviar foto
            </Button>
        </Flex>


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
                // 🔹 CLIQUE NA FOTO (PRONTO PARA FOTO AMPLIADA)
                onClick={() => {
                  setSelectedPhoto(photo);
                  setIsPhotoOpen(true);
                }}
              />
            </Box>
          ))}
        </SimpleGrid>
     
      )}
      {/* 🔹 MODAL DE UPLOAD */}
        <UploadPhotoModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        albumId={albumId}
        onSuccess={fetchPhotos}
        />
        <DialogRoot open={isPhotoOpen} onOpenChange={() => setIsPhotoOpen(false)}>
          <DialogContent>
            <DialogCloseTrigger />
            <DialogBody p={4}>
              {selectedPhoto && (
                <Image
                  src={`http://localhost:3333/uploads/${selectedPhoto.file_path}`}
                  alt="Foto ampliada"
                  maxH="80vh"
                  mx="auto"
                />
              )}
            </DialogBody>
          </DialogContent>
        </DialogRoot>


    </Box>
    
  );
}
