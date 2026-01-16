import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Albums from '../pages/Albums';
import AlbumDetails from '../pages/AlbumDetails';
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/albums"
        element={
          <PrivateRoute>
            <Albums />
          </PrivateRoute>
        }
      />

      <Route
        path="/albums/:id"
        element={
          <PrivateRoute>
            <AlbumDetails />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

  );
}
