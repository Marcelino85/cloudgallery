/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // ou Spinner do Chakra
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
