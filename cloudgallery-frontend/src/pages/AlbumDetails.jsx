/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  Flex,
  Spinner,
  Container,
  VStack,
  Table,
  CloseButton
} from '@chakra-ui/react';

import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogBackdrop,
  DialogPositioner
} from '@chakra-ui/react';

import api from '../api/api';
import UploadPhotoModal from '../components/UploadPhotoModal';

const BASE_URL = 'http://localhost:3333';

export default function AlbumDetails() {
  const { id: albumId } = useParams();
  const navigate = useNavigate();

  // =========================
  // ESTADOS PRINCIPAIS
  // =========================
  const [photos, setPhotos] = useState([]);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Upload
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Foto ampliada
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const canDeleteAlbum = photos.length === 0;

  // =========================
  // BUSCA DE DADOS (NOVA ROTA)
  // =========================
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [photosRes, albumRes] = await Promise.all([
        api.get(`/photos/${albumId}`),
        api.get(`/albums/${albumId}`) // ✅ NOVA ROTA
      ]);

      setPhotos(Array.isArray(photosRes.data) ? photosRes.data : []);
      setAlbumInfo(albumRes.data);
    } catch (error) {
      console.error('Erro ao buscar dados do álbum:', error);
    } finally {
      setLoading(false);
    }
  }, [albumId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <Flex justify="center" mt={20}>
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  async function handleDeleteAlbum() {
  try {
    await api.delete(`/albums/${albumId}`);
    navigate('/albums');
  } catch (error) {
    console.error('Erro ao excluir álbum', error);
  }
}


  // =========================
  // RENDER
  // =========================
  return (
    <Box minH="100vh" bg="gray.50" pb={10}>
      <Container maxW="container.xl" pt={6}>

        {/* VOLTAR */}
        <Button
          variant="ghost"
          mb={4}
          onClick={() => navigate('/albums')}
          color="gray.600"
        >
          ← Voltar para Meus Álbuns
        </Button>

        {/* CABEÇALHO */}
        <Flex justify="space-between" align="center" mb={8} wrap="wrap" gap={4}>
          <VStack align="start" gap={1}>
            <Heading size="2xl" color="blue.900">
              {albumInfo?.title}
            </Heading>
            <Text color="gray.500">
              {albumInfo?.description || 'Este álbum não possui descrição.'}
            </Text>
            {/* 🔴 EXCLUIR ÁLBUM */}
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                mt={2}
                isDisabled={!canDeleteAlbum}
                onClick={handleDeleteAlbum}
              >
                Excluir Álbum
              </Button>

              {!canDeleteAlbum && (
                <Text fontSize="xs" color="gray.500">
                  O álbum não pode ser excluído enquanto possuir fotos.
                </Text>
              )}
          </VStack>

          <Flex gap={2} bg="white" p={1} borderRadius="md" shadow="sm">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'solid' : 'ghost'}
              onClick={() => setViewMode('grid')}
            >
              Miniaturas
            </Button>

            <Button
              size="sm"
              variant={viewMode === 'table' ? 'solid' : 'ghost'}
              onClick={() => setViewMode('table')}
            >
              Tabela
            </Button>

            <Button
              colorPalette="blue"
              size="md"
              onClick={() => setIsUploadOpen(true)}
              ml={2}
            >
              + Adicionar Fotos
            </Button>
          </Flex>
        </Flex>

        {/* SEM FOTOS */}
        {photos.length === 0 ? (
          <Box
            py={20}
            textAlign="center"
            bg="white"
            borderRadius="xl"
            border="2px dashed"
            borderColor="gray.200"
          >
            <Text color="gray.400">
              Nenhuma foto encontrada neste álbum.
            </Text>
          </Box>
        ) : (
          <>
            {/* ================= GRID ================= */}
            {viewMode === 'grid' && (
              <SimpleGrid columns={{ base: 2, md: 4 }} gap={6}>
                {photos.map(photo => (
                  <Box
                    key={photo.id}
                    bg="white"
                    p={2}
                    borderRadius="lg"
                    shadow="sm"
                    _hover={{ shadow: 'md' }}
                  >
                    <Image
                      src={`${BASE_URL}/uploads/${photo.file_path}`}
                      h="180px"
                      w="100%"
                      objectFit="cover"
                      borderRadius="md"
                      cursor="pointer"
                      onClick={() => {
                        setSelectedPhoto(photo);
                        setIsPhotoOpen(true);
                      }}
                    />

                    <Text
                      fontSize="xs"
                      mt={2}
                      textAlign="center"
                      fontWeight="bold"
                      noOfLines={1}
                    >
                      {photo.title || 'Sem título'}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            )}

            {/* ================= TABELA ================= */}
            {viewMode === 'table' && (
              <Box
                bg="white"
                borderRadius="lg"
                shadow="sm"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.200"
              >
                <Table.Root size="md">
                  <Table.Header bg="blue.800">
                    <Table.Row>
                      <Table.ColumnHeader color="black">Foto</Table.ColumnHeader>
                      <Table.ColumnHeader color="black">Tamanho</Table.ColumnHeader>
                      <Table.ColumnHeader color="black">Data</Table.ColumnHeader>
                      <Table.ColumnHeader color="black">Cor</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {photos.map(photo => (
                      <Table.Row key={photo.id} _hover={{ bg: 'gray.50' }}>
                        <Table.Cell>
                          <Flex align="center" gap={3}>
                            <Image
                              src={`${BASE_URL}/uploads/${photo.file_path}`}
                              h="35px"
                              w="35px"
                              objectFit="cover"
                              borderRadius="sm"
                              cursor="pointer"
                              onClick={() => {
                                setSelectedPhoto(photo);
                                setIsPhotoOpen(true);
                              }}
                            />
                            <Text fontSize="sm">
                              {photo.title || 'Sem título'}
                            </Text>
                          </Flex>
                        </Table.Cell>

                        <Table.Cell fontSize="sm">
                          {(photo.size / 1024).toFixed(1)} KB
                        </Table.Cell>

                        <Table.Cell fontSize="sm">
                          {photo.acquisition_date
                            ? new Date(photo.acquisition_date).toLocaleDateString()
                            : '-'}
                        </Table.Cell>

                        <Table.Cell>
                          <Box
                            w="16px"
                            h="16px"
                            borderRadius="full"
                            bg={photo.dominant_color || '#eee'}
                            border="1px solid #ddd"
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            )}
          </>
        )}

    
        {/* ================= FOTO AMPLIADA ================= */}
<DialogRoot open={isPhotoOpen} onOpenChange={e => setIsPhotoOpen(e.open)}>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent maxW="4xl" borderRadius="2xl" overflow="hidden">

      {/* HEADER */}
      <Flex
        justify="space-between"
        align="center"
        px={4}
        py={3}
        bg="blackAlpha.700"
        color="white"
      >
        <Text fontWeight="bold" fontSize="sm">
          {selectedPhoto?.title || 'Sem título'}
        </Text>

        {/* BOTÃO X (AGORA VISÍVEL) */}
        <CloseButton
          size="md"
          onClick={() => setIsPhotoOpen(false)}
        />
      </Flex>

      {/* IMAGEM */}
      <DialogBody p={0} bg="black">
        {selectedPhoto && (
          <Image
            src={`${BASE_URL}/uploads/${selectedPhoto.file_path}`}
            maxH="80vh"
            mx="auto"
            objectFit="contain"
          />
        )}
      </DialogBody>

      {/* DESCRIÇÃO */}
      {selectedPhoto?.description && (
        <Box
          p={4}
          bg="blackAlpha.800"
          color="white"
          fontSize="sm"
        >
          {selectedPhoto.description}
        </Box>
      )}

    </DialogContent>
  </DialogPositioner>
</DialogRoot>



        {/* ================= MODAL UPLOAD ================= */}
        <UploadPhotoModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          albumId={albumId}
          onSuccess={fetchData}
        />
      </Container>
    </Box>
  );
}
