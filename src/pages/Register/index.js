import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import { logout } from '../../services/auth';
import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const data = ({
      name, email, password
    });

    try {
      const response = await api.post('users', data);
      logout();


      alert(`Cadastro efetuado com sucesso\nPara acesso utilize o email: ${response.data.user.email}`);
      navigate('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="register-container">

      <div className="content">
        <section>
          <img src={logoImg} alt="My Books" />

          <h1>Cadastro</h1>
          <p>Efetue o cadastro para acessar o sistema</p>

          <Link className="back-link" to="/library">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Minha Estante
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="Senha"
            type="password"
            value={password}
            minlength="6"
            required
            onChange={e => setPassword(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>

    </div>
  );
}