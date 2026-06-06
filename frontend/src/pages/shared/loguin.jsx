import React, { useState } from 'react';
import { useAuth } from '../../services/contexts/authContext'; // Se você usar o contexto de login
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './style.css'; // Carrega o mesmo arquivo de estilos que o cadastro usa

export default function Loguin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      // Exemplo de envio para a API (Ajuste a rota conforme o seu back-end)
      const resposta = await api.post('/api/auth/login', { email, senha });
      
      // Armazena o token ou dados de login se necessário
      console.log("Login efetuado com sucesso!", resposta.data);
      
      // Aqui você pode redirecionar para a Home após o login
    } catch (err) {
      const mensagemErro = err.response?.data?.mensagem || 'E-mail ou senha incorretos.';
      setErro(mensagemErro);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Identidade Visual igual à imagem que você enviou */}
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

          {/* Botão ovalado no estilo "Pedir" da imagem */}
          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        {/* Navegação instantânea usando o Link do React Router */}
        <p className="auth-switch">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>

      </div>
    </div>
  );
}