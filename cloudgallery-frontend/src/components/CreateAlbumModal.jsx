/* eslint-disable react/prop-types */
import {
  Dialog,
  Button,
  Input,
  Textarea,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { createAlbum } from '../services/albumsService';

export default function CreateAlbumModal({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title) return;

    try {
      setLoading(true);
      await createAlbum({ title, description });
      onCreated();
      onClose();
      setTitle('');
      setDescription('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => {
    if (!open) onClose();
  }}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Criar novo álbum</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Stack spacing={4}>
              <Input
                placeholder="Nome do álbum"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Textarea
                placeholder="Descrição (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
              isDisabled={!title}
            >
              Criar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
