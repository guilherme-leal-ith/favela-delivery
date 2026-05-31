import React from 'react';
import { AuthProvider } from './services/contexts/authContext';
//import { Cadastro } from './pages/shared/cadastro';
import { Login } from './pages/shared/loguin';

export default function App() {
  return (
    <AuthProvider>
      { /* Como ainda não configurei o roteador (React Router), 
        vou alternar manualmente entre <Login /> ou <Cadastro /> aqui 
        no return para testar cada um dos ecrãs no navegador!
      */ }
      <Login />
    </AuthProvider>
  );
}