import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import api from '../api/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
      });

      setSuccess('Cadastro realizado com sucesso! Faça login.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Erro ao realizar cadastro'
      );
    }
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box w="100%" maxW="400px" p={6} borderWidth="1px" borderRadius="lg">
        <Heading mb={6}>Cadastro</Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
            {success && <Text color="green.500">{success}</Text>}

            <Button type="submit" colorScheme="blue">
              Cadastrar
            </Button>

            <Text fontSize="sm" textAlign="center">
              Já tem conta?{' '}
              <Text
                as={Link}
                to="/"
                color="blue.500"
                cursor="pointer"
              >
                Faça login
              </Text>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
