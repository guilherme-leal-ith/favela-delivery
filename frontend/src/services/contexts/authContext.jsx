import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../authService';
import api from '../api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Ao carregar o app, verifica se já existe um usuário logado no navegador
    const tokenSalvo = localStorage.getItem('@FavelaFood:token');
    const usuarioSalvo = localStorage.getItem('@FavelaFood:usuario');

    if (tokenSalvo && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  const loginGlobal = async (email, senha) => {
    const dados = await authService.login(email, senha);
    
    // Salva no estado e no localStorage do navegador
    setUsuario(dados.usuario);
    localStorage.setItem('@FavelaFood:token', dados.token);
    localStorage.setItem('@FavelaFood:usuario', JSON.stringify(dados.usuario));
    
    return dados.usuario; // Retorna o usuário para sabermos o "tipo" na tela de login
  };

  const logoutGlobal = () => {
    localStorage.removeItem('@FavelaFood:token');
    localStorage.removeItem('@FavelaFood:usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ logado: !!usuario, usuario, loginGlobal, logoutGlobal, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso do contexto nos componentes
export function useAuth() {
  return useContext(AuthContext);
}