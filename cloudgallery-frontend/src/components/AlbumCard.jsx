/* eslint-disable react/prop-types */
import { Box, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function AlbumCard({ album }) {
  const navigate = useNavigate();

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.2s"
      cursor="pointer"
      _hover={{ transform: 'translateY(-4px)', shadow: 'xl', borderColor: 'blue.200' }}
      onClick={() => navigate(`/albums/${album.id}`)}
    >
      {/* Placeholder para a capa do álbum */}
      <Box bgGradient="to-br" gradientFrom="blue.400" gradientTo="blue.600" h="140px" display="flex" align="center" justify="center">
         <Text color="white" fontWeight="bold" fontSize="4xl" opacity="0.3">IMG</Text>
      </Box>

      <VStack p={4} align="start" gap={1}>
        <Text fontWeight="bold" fontSize="lg" color="gray.800" noOfLines={1}>
          {album.title}
        </Text>
        <Text fontSize="sm" color="gray.500" noOfLines={2}>
          {album.description || "Sem descrição disponível."}
        </Text>
      </VStack>
    </Box>
  );
}