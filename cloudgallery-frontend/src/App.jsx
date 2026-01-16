import AppRoutes from './routes/AppRoutes';

import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box minH="100vh" bg="gray.50"> 
      <AppRoutes />
    </Box>
    
  );
}

export default App;