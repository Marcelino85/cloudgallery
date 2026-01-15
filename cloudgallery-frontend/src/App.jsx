import { Box, Heading, Text } from '@chakra-ui/react';

function App() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Heading>CloudGallery</Heading>
        <Text mt={4}>
          Frontend setup concluído 🚀
        </Text>
      </Box>
    </Box>
  );
}

export default App;
