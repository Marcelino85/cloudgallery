/* eslint-disable react/prop-types */
import {
  Button,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Input,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import api from '../api/api';

export default function UploadPhotoModal({
  isOpen,
  onClose,
  albumId,
  onSuccess
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      await api.post(`/photos/${albumId}`, formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erro ao enviar foto', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar Foto</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>

        <DialogBody>
          <Stack spacing={4}>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Stack>
        </DialogBody>

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            colorScheme="blue"
            isLoading={loading}
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
