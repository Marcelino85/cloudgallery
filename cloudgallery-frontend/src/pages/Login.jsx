import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch {
      setError('E-mail ou senha inválidos');
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box w="100%" maxW="400px" p={6} borderWidth="1px" borderRadius="lg">
        <Heading mb={6}>Login</Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Input
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Text color="red.500">{error}</Text>}

            <Button type="submit" colorScheme="blue">
              Entrar
            </Button>
            <Text fontSize="sm" textAlign="center">
            Não tem conta?{' '}
            <Text as="span" color="blue.500" cursor="pointer">
                Cadastre-se
            </Text>
            </Text>

          </Stack>
        </form>
      </Box>
    </Box>
  );
}
