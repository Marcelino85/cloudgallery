/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const { token } = response.data;

    localStorage.setItem('token', token);

    // Busca dados completos do usuário
    const meResponse = await api.get('/auth/me');
    setUser(meResponse.data);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api
        .get('/auth/me')
        .then((response) => setUser(response.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
