import React from 'react';
import { AuthProvider } from './services/contexts/authContext'; // Caminho real corrigido!
import { Login } from './pages/shared/loguin'; // Apontando para o seu loguin.jsx com "u"
import { Cadastro } from './pages/shared/cadastro'; // Apontando para o seu cadastro.jsx dentro de pages/shared

export default function App() {
  return (
    <AuthProvider>
      {}
      <Cadastro />
    </AuthProvider>
  );
}