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
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext'; // Importando para o login automático

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Função de login para automação

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Validação de senha: Mínimo 6 caracteres, letras, números e símbolos
  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(pass);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!validatePassword(password)) {
      setError('A senha deve ter no mínimo 6 caracteres, incluindo letras, números e símbolos.');
      return;
    }

    try {
      // 1. Cria a conta [cite: 21]
      await api.post('/auth/register', { name, email, password });

      // 2. Login automático imediato
      await login(email, password);
      
      // 3. Redireciona para os álbuns [cite: 22, 23]
      navigate('/albums');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro');
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
      gradientTo="violet.50"
    >
      <Container maxW="md">
        <Box bg="white" p={8} borderRadius="2xl" boxShadow="xl" borderWidth="1px">
          <VStack mb={8} textAlign="center">
            <Heading size="xl" color="blue.800">Criar Conta</Heading>
            <Text color="gray.600">Junte-se à nossa galeria inteligente</Text>
          </VStack>

          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Box>
                <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">Nome</Text>
                <Input
                  placeholder="Seu nome completo"
                  size="lg"
                  variant="subtle"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>

              <Box>
                <Text fontSize="sm" mb={1} fontWeight="medium" color="gray.700">E-mail</Text>
                <Input
                  placeholder="exemplo@email.com"
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
                  placeholder="mín. 6 caracteres (letras, números e @)"
                  size="lg"
                  variant="subtle"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>

              {error && (
                <Text color="red.500" fontSize="xs" bg="red.50" p={2} borderRadius="md">
                  {error}
                </Text>
              )}

              <Button 
                type="submit" 
                size="lg" 
                colorPalette="blue"
                fontWeight="bold"
                mt={2}
              >
                Concluir Cadastro
              </Button>

              <Text fontSize="sm" textAlign="center" color="gray.600">
                Já possui conta?{' '}
                <Text 
                  as={Link} 
                  to="/" 
                  color="blue.600" 
                  fontWeight="semibold"
                >
                  Faça login aqui.
                </Text>
              </Text>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
}