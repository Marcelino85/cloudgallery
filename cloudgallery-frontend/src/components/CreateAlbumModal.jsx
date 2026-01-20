/* eslint-disable react/prop-types */
import {
  Button,
  Input,
  Textarea,
  Stack,
  Box,
  Text,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogBackdrop,
  DialogPositioner,
  DialogCloseTrigger 
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
      // Enviando Título e Descrição conforme solicitado no teste
      await createAlbum({ title, description });
      
      // Limpa os campos após o sucesso
      setTitle('');
      setDescription('');
      
      onCreated(); // Atualiza a lista de álbuns na tela principal
      onClose();   // Fecha o modal
    } catch (error) {
      console.error("Erro ao criar álbum:", error);
      alert("Erro ao criar o álbum. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(details) => !details.open && onClose()}
    >
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent borderRadius="2xl" bg="white" boxShadow="2xl">
          
          {/* O "X" para fechar no canto superior direito */}
          <DialogCloseTrigger 
            position="absolute" 
            top="4" 
            right="4" 
            cursor="pointer"
          />

          <DialogHeader borderBottomWidth="1px" borderColor="gray.100" pb={4}>
            <DialogTitle fontSize="xl" color="blue.800" fontWeight="bold">
              Novo Álbum de Fotos
            </DialogTitle>
          </DialogHeader>

          <DialogBody py={6}>
            <Stack gap={5}>
              <Box>
                <Text fontSize="sm" mb={1} fontWeight="semibold" color="gray.700">
                  Título do Álbum
                </Text>
                <Input
                  placeholder="Ex: Minhas Viagens"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="subtle"
                  size="lg"
                  focusBorderColor="blue.500"
                />
              </Box>

              <Box>
                <Text fontSize="sm" mb={1} fontWeight="semibold" color="gray.700">
                  Descrição (Opcional)
                </Text>
                <Textarea
                  placeholder="Sobre o que são estas fotos?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="subtle"
                  size="lg"
                  rows={4}
                  resize="none"
                />
              </Box>
            </Stack>
          </DialogBody>

          <DialogFooter borderTopWidth="1px" borderColor="gray.100" pt={4}>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={onClose} 
              disabled={loading}
              color="gray.600"
            >
              Cancelar
            </Button>
            <Button
              colorPalette="blue"
              onClick={handleSubmit}
              loading={loading}
              disabled={!title}
              px={8}
            >
              Concluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}