import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Text fontSize="xl" fontWeight="bold">
        Meus álbuns de fotos
      </Text>

      <Box>
        <Text as="span" mr={2}>
          Olá, {user?.name}
        </Text>
        <Button size="sm" variant="link" colorScheme="blue" onClick={() => {
            logout();
            navigate('/');
          }}>
          sair
        </Button>
      </Box>
    </Flex>
  );
}
