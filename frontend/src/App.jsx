import React from 'react';
import { AuthProvider } from './services/contexts/authContext'; 
import { Login } from './pages/shared/loguin'; 
import { Cadastro } from './pages/shared/cadastro'; 

export default function App() {
  return (
    <AuthProvider>
      {}
      <Cadastro />
    </AuthProvider>
  );
}