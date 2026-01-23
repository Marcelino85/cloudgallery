import { Box, Flex, Text, Button, Container} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.100" py={4} mb={8}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="blue.800" letterSpacing="tight">
            CloudGallery
          </Text>

          <Flex align="center" gap={4}>
            <Text fontSize="sm" color="gray.600">
              Olá, <Text as="span" fontWeight="bold" color="gray.900">{user?.name}</Text>
            </Text>
            <Button 
              size="sm" 
              variant="outline" 
              colorPalette="red" 
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Sair
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}