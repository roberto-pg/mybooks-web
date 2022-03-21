import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import capaImg from '../../assets/capa.jpg';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import { login } from '../../services/auth';
import './styles.css';



export default function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogon(e) {
    e.preventDefault();

    const data = ({ email, password })

    try {
      const response = await api.post('authenticate', data)
      login(response.data.user.token);

      navigate('/library');
      alert(`Você está logado como: ${email}`)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img className="log" src={logoImg} alt="Logo" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            minLength="6"
            required
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
        </form>
      </section>

      <img src={capaImg} alt="Capa" />
    </div>
  );
}