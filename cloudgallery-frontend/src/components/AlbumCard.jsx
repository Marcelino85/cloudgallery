/* eslint-disable react/prop-types */
import { Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function AlbumCard({ album }) {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={3}
      cursor="pointer"
      _hover={{ shadow: 'md' }}
      onClick={() => navigate(`/albums/${album.id}`)}
    >
      <Box bg="gray.200" h="120px" mb={2} borderRadius="md" />

      <Text fontWeight="bold">{album.name}</Text>
      <Text fontSize="sm" color="gray.600">
        {album.description}
      </Text>
    </Box>
  );
}

