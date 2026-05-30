import React from 'react';
import { AuthProvider } from './services/contexts/authContext';
//import { Cadastro } from './pages/shared/cadastro';
import { Login } from './pages/shared/loguin';

export default function App() {
  return (
    <AuthProvider>
      {/* Dica: Como ainda não configurámos o roteador (React Router), 
        pode alternar manualmente entre <Login /> ou <Cadastro /> aqui 
        no return para testar cada um dos ecrãs no navegador!
      */}
      <Login />
    </AuthProvider>
  );
}