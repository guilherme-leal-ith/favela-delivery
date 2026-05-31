import React, { useState } from 'react';
import { useAuth } from '../../services/contexts/authContext';
import api from '../../services/api';

export function Cadastro() {
  const [tipoUsuario, setTipoUsuario] = useState('CONSUMIDOR'); // CONSUMIDOR, ESTABELECIMENTO, ENTREGADOR
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  
  // Campos específicos
  const [comunidade, setComunidade] = useState('');
  const [cnh, setCnh] = useState('');

  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);


  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');

    
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
    await api.post('/api/user', dadosCadastro);
 
      setSucesso(true);
    } catch (err) {
      const mensagemErro = err.response?.data?.mensagem || 'Erro ao realizar o cadastro. Verifique os dados ou tente novamente.';
      setErro(mensagemErro);
    }
  };

  if (sucesso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Cadastro Concluído!</h2>
          <p className="text-gray-600 mb-6">Conta criada no FavelaFood.</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-4 py-2 rounded">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
          Cadastro <span className="text-yellow-500">FavelaFood</span>
        </h2>

        {/* Selecionando o tipo de usuário */}
        <div className="flex bg-slate-100 p-1 rounded mb-6">
          {['CONSUMIDOR', 'ESTABELECIMENTO', 'ENTREGADOR'].map((tipo) => (
            <button
              key={tipo} type="button"
              className={`flex-1 py-2 text-xs font-bold rounded ${tipoUsuario === tipo ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
              onClick={() => setTipoUsuario(tipo)}
            >
              {tipo === 'CONSUMIDOR' ? 'Cliente' : tipo === 'ESTABELECIMENTO' ? 'Loja' : 'Entregador'}
            </button>
          ))}
        </div>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">nome</label>
            <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">senha</label>
            <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Telefone</label>
            <input type="text" required value={telefone} onChange={(e) => setTelefone(e.target.value)} className="mt-1 block w-full p-2 border rounded" placeholder="(21) 99999-9999" />
          </div>

          {/* Campos Dinâmicos */}
          {tipoUsuario === 'CONSUMIDOR' && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Comunidade</label>
              <input type="text" required value={comunidade} onChange={(e) => setComunidade(e.target.value)} className="mt-1 block w-full p-2 border rounded" placeholder="Ex: Rocinha" />
            </div>
          )}

          {tipoUsuario === 'ENTREGADOR' && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Carteira de Habilitação (CNH)</label>
              <input type="text" required value={cnh} onChange={(e) => setCnh(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
            </div>
          )}

          <button type="submit" className="w-full py-2 px-4 rounded bg-blue-600 text-white font-bold hover:bg-blue-700">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}