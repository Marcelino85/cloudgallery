import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Container,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/albums'); // Redireciona para a galeria conforme o requisito 
    } catch {
      setError('E-mail ou senha inválidos');
    }
  }

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      bgGradient="to-br" 
      gradientFrom="slate.50" 
      gradientTo="blue.50"
    >
      <Container maxW="md">
        <Box 
          bg="white" 
          p={8} 
          borderRadius="2xl" 
          boxShadow="xl" 
          borderWidth="1px" 
          borderColor="gray.100"
        >
          <VStack mb={8} textAlign="center">
            <Heading size="xl" color="blue.800">CloudGallery</Heading>
            <Text color="gray.600">Autentique-se para acessar seus álbuns</Text>
          </VStack>

          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Box>
                <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">E-mail</Text>
                <Input
                  placeholder="seu@email.com"
                  size="lg"
                  variant="subtle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Box>

              <Box>
                <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">Senha</Text>
                <Input
                  type="password"
                  placeholder="sua senha"
                  size="lg"
                  variant="subtle"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <Text color="red.500" fontSize="xs" mt={2} bg="red.50" p={2} borderRadius="md">
                    {error}
                  </Text>
                )}
              </Box>

              <Button 
                type="submit" 
                size="lg" 
                colorPalette="blue" 
                fontWeight="bold"
                mt={2}
              >
                Entrar
              </Button>

              <Text fontSize="sm" textAlign="center" color="gray.600">
                Não tem conta?{' '}
                <Text 
                  as={Link} 
                  to="/register" 
                  color="blue.600" 
                  fontWeight="semibold"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Cadastre-se aqui.
                </Text>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}