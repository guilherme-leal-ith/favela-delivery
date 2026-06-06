import React from 'react';
import { AuthProvider } from './services/contexts/authContext'; 
import  Loguin  from './pages/shared/loguin'; 
import  Cadastro  from './pages/shared/cadastro'; 
import { BrowserRouter ,Route  ,Routes, Navigate } from 'react-router-dom';
import HomeConsumidor from './pages/consumidor/home-consumidor';
import Cardapio from './pages/consumidor/cardapio';

export default function App() {
  return (
    /*<AuthProvider>
      {}
      <Cadastro />
    </AuthProvider>
  */
    <BrowserRouter>
      <Routes>
        {/*rota para a pagina de cadastro*/}
        <Route path="/cadastro" element={<Cadastro />}/>
        {/*rota para a pagina de cadastro*/}
        <Route path="/loguin" element={<Loguin/>}/>
        {/* rota padrão: Se acessar a raiz (http://localhost:5173), manda para o cadastro */}
        <Route path="*" element={<Navigate to="/cadastro" />} />
        <Route path="/home" element={<HomeConsumidor />} />
        <Route path="/cardapio" element={<Cardapio />} />
      </Routes>
    </BrowserRouter>
   );
}