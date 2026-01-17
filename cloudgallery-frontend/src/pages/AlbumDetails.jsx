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

  // Upload
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Foto ampliada
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  // 🔹 Toggle Grid ↔ Tabela
  const [viewMode, setViewMode] = useState('grid');

  // 🔹 Exclusão
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 🔹 Buscar fotos
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

  // 🔹 Confirmar exclusão
  async function handleDeletePhoto() {
    try {
      await api.delete(`/photos/${photoToDelete.id}`);
      setIsDeleteOpen(false);
      setPhotoToDelete(null);
      fetchPhotos();
    } catch (error) {
      console.error('Erro ao excluir foto', error);
    }
  }

  if (loading) {
    return (
      <Box p={8}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={8}>
      {/* CABEÇALHO */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">Fotos do Álbum</Heading>

        <Flex gap={2}>
          <Button
            variant={viewMode === 'grid' ? 'solid' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            Miniaturas
          </Button>

          <Button
            variant={viewMode === 'table' ? 'solid' : 'outline'}
            onClick={() => setViewMode('table')}
          >
            Tabela
          </Button>

          <Button colorScheme="blue" onClick={() => setIsUploadOpen(true)}>
            Enviar foto
          </Button>
        </Flex>
      </Flex>

      {photos.length === 0 && (
        <Text>Nenhuma foto cadastrada neste álbum.</Text>
      )}

      {/* ================= GRID ================= */}
      {viewMode === 'grid' && (
        <SimpleGrid columns={[2, 3, 4]} spacing={4}>
          {photos.map((photo) => (
            <Box key={photo.id} borderWidth="1px" borderRadius="md">
              <Image
                src={`http://localhost:3333/uploads/${photo.file_path}`}
                h="150px"
                w="100%"
                objectFit="cover"
                cursor="pointer"
                onClick={() => {
                  setSelectedPhoto(photo);
                  setIsPhotoOpen(true);
                }}
              />

              <Flex justify="space-between" p={2}>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    setPhotoToDelete(photo);
                    setIsDeleteOpen(true);
                  }}
                >
                  Excluir
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* ================= TABELA ================= */}
      {viewMode === 'table' && (
        <Box>
          {photos.map((photo) => (
            <Flex
              key={photo.id}
              align="center"
              gap={4}
              p={3}
              borderBottom="1px solid #eee"
            >
              <Image
                src={`http://localhost:3333/uploads/${photo.file_path}`}
                h="60px"
                w="60px"
                objectFit="cover"
                cursor="pointer"
                onClick={() => {
                  setSelectedPhoto(photo);
                  setIsPhotoOpen(true);
                }}
              />

              <Box flex="1">
                <Text fontWeight="bold">
                  {photo.title || 'Sem título'}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {(photo.size / 1024).toFixed(1)} KB
                </Text>
              </Box>

              <Button
                size="sm"
                colorScheme="red"
                onClick={() => {
                  setPhotoToDelete(photo);
                  setIsDeleteOpen(true);
                }}
              >
                Excluir
              </Button>
            </Flex>
          ))}
        </Box>
      )}

      {/* MODAL UPLOAD */}
      <UploadPhotoModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        albumId={albumId}
        onSuccess={fetchPhotos}
      />

      {/* FOTO AMPLIADA */}
      <DialogRoot open={isPhotoOpen} onOpenChange={() => setIsPhotoOpen(false)}>
        <DialogContent>
          <DialogCloseTrigger />
          <DialogBody p={4}>
            {selectedPhoto && (
              <Image
                src={`http://localhost:3333/uploads/${selectedPhoto.file_path}`}
                maxH="80vh"
                mx="auto"
              />
            )}
          </DialogBody>
        </DialogContent>
      </DialogRoot>

      {/* 🔴 CONFIRMAÇÃO DE EXCLUSÃO */}
      <DialogRoot
        open={isDeleteOpen}
        onOpenChange={() => setIsDeleteOpen(false)}
      >
        <DialogContent>
          <DialogCloseTrigger />
          <DialogBody p={6}>
            <Text mb={4}>
              Tem certeza que deseja excluir esta foto?
            </Text>

            <Flex justify="flex-end" gap={3}>
              <Button onClick={() => setIsDeleteOpen(false)}>
                Cancelar
              </Button>

              <Button colorScheme="red" onClick={handleDeletePhoto}>
                Excluir
              </Button>
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
