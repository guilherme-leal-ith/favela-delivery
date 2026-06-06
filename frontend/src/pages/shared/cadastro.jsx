import React, { useState } from 'react';
import { useAuth } from '../../services/contexts/authContext'; // Mantive caso seu projeto use o contexto de autenticação
import api from '../../services/api';
import './style.css'; // Correção crucial: removido o "s" do final para bater com o seu arquivo real
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('CONSUMIDOR');
  const [comunidade, setComunidade] = useState('');
  const [cnh, setCnh] = useState('');
  
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso(false);

    const dadosCadastro = { 
      tipoUsuario: tipoUsuario, 
      nome, 
      email, 
      senha, 
      telefone 
    };

    console.log("Dados que o React está enviando:", dadosCadastro);

    if (tipoUsuario === 'CONSUMIDOR') dadosCadastro.comunidade = comunidade;
    if (tipoUsuario === 'ENTREGADOR') dadosCadastro.cnh = cnh;

    try {
      // Faz o disparo da requisição POST para a API unificada do Back-end
      await api.post('/api/user', dadosCadastro);
      setSucesso(true);
      
      // Limpa os campos após o sucesso
      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setComunidade('');
      setCnh('');
    } catch (err) {
      const mensagemErro = err.response?.data?.mensagem || 'Erro ao realizar o cadastro. Verifique os dados ou tente novamente.';
      setErro(mensagemErro);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <h1 className="auth-logo">FavelaFood</h1>
        <p className="auth-subtitle">Crie sua conta e faça parte da nossa rede</p>

        {erro && <div className="msg-erro">{erro}</div>}
        {sucesso && <div className="msg-sucesso">Cadastro realizado com sucesso! 🎉</div>}

        <form onSubmit={handleCadastro}>
          
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              required 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Ex: João Silva"
            />
          </div>

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
              placeholder="Digite uma senha segura"
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input 
              type="text" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
              placeholder="(21) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Perfil</label>
            <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
              <option value="CONSUMIDOR">Consumidor (Cliente)</option>
              <option value="ENTREGADOR">Entregador</option>
              <option value="RESTAURANTE">Restaurante</option>
            </select>
          </div>

          {/* Renderização Condicional baseado no tipo de perfil */}
          {tipoUsuario === 'CONSUMIDOR' && (
            <div className="form-group">
              <label>Comunidade / Região</label>
              <input 
                type="text" 
                required
                value={comunidade} 
                onChange={(e) => setComunidade(e.target.value)} 
                placeholder="Ex: Rocinha, Vidigal..."
              />
            </div>
          )}

          {tipoUsuario === 'ENTREGADOR' && (
            <div className="form-group">
              <label>Número da CNH</label>
              <input 
                type="text" 
                required
                value={cnh} 
                onChange={(e) => setCnh(e.target.value)} 
                placeholder="Digite sua CNH"
              />
            </div>
          )}

          <button type="submit" className="btn-primary">
            Cadastrar
          </button>
        </form>

        <p className="auth-switch">
          Já tem uma conta? <Link to="/loguin">Faça Login</Link>
        </p>

      </div>
    </div>
  );
}