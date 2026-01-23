/* eslint-disable react/prop-types */
import {
  Button,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogBackdrop,
  DialogPositioner,
  DialogCloseTrigger, // Importação correta
  Input,
  Stack,
  Text,
  Box,
  Textarea
} from '@chakra-ui/react';
import { useState } from 'react';
import api from '../api/api';

export default function UploadPhotoModal({ isOpen, onClose, albumId, onSuccess }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [dominantColor, setDominantColor] = useState('#000000');
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file || !title) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('acquisition_date', acquisitionDate);
    formData.append('dominant_color', dominantColor);

    try {
      await api.post(`/photos/${albumId}`, formData);
      onSuccess();
      onClose();
      setFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao enviar foto', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={(details) => !details.open && onClose()}>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent borderRadius="xl" bg="white">
          <DialogCloseTrigger top="2" right="2" /> {/* O "X" posicionado aqui */}
          <DialogHeader borderBottomWidth="1px" borderColor="gray.100">
            <DialogTitle fontSize="xl" color="blue.800">Adicionar Nova Foto</DialogTitle>
          </DialogHeader>

          <DialogBody py={6}>
            <Stack gap={4}>
              <Box>
                <Text fontSize="sm" mb={1} fontWeight="semibold">Arquivo da Imagem</Text>
                <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} variant="subtle" p={1} />
              </Box>
              <Box>
                <Text fontSize="sm" mb={1} fontWeight="semibold">Título da Foto</Text>
                <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} variant="subtle" />
              </Box>
              <Box>
                <Text fontSize="sm" mb={1} fontWeight="semibold">Descrição</Text>
                <Textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} variant="subtle" />
              </Box>
              <Stack direction="row" gap={4}>
                <Box flex="1">
                  <Text fontSize="sm" mb={1} fontWeight="semibold">Data de Aquisição</Text>
                  <Input type="datetime-local" value={acquisitionDate} onChange={(e) => setAcquisitionDate(e.target.value)} variant="subtle" />
                </Box>
                <Box>
                  <Text fontSize="sm" mb={1} fontWeight="semibold">Cor</Text>
                  <Input type="color" value={dominantColor} onChange={(e) => setDominantColor(e.target.value)} height="40px" variant="subtle" />
                </Box>
              </Stack>
            </Stack>
          </DialogBody>

          <DialogFooter borderTopWidth="1px" borderColor="gray.100">
            <Button onClick={onClose} variant="ghost">Cancelar</Button>
            <Button onClick={handleUpload} colorPalette="blue" loading={loading} disabled={!file || !title}>
              Enviar Foto
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}