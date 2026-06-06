import React, { useState } from 'react';
import { useAuth } from '../../services/contexts/authContext'; // Mantido caso use
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'; 

export default function Loguin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    
    if (email === '' || senha === '') {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // Exemplo de envio para a API 
      const resposta = await api.post('/api/auth/login', { email, senha });
      
      console.log("Login efetuado com sucesso!", resposta.data);
      
      // Se precisar salvar dados ou token do usuário logado:
      // localStorage.setItem('@FavelaFood:user', JSON.stringify(resposta.data));
      
      // Redireciona para a Home apenas se o back-end autenticar com sucesso
      navigate('/home'); 
      
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      const mensagemErro = err.response?.data?.mensagem || 'E-mail ou senha incorretos.';
      setErro(mensagemErro);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <h1 className="auth-logo">FavelaFood</h1>
        <p className="auth-subtitle">Entre com a sua conta para fazer pedidos</p>

        {erro && <div className="msg-erro">{erro}</div>}

        <form onSubmit={handleLogin}>
          
          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              required 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Digite sua senha"
            />
          </div>

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        <p className="auth-switch">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>

      </div>
    </div>
  );
}