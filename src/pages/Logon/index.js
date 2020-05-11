import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { login } from '../../services/auth';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';
import capaImg from '../../assets/capa.jpg';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        const data = ({
            email, password
        })

        try {
            const response = await api.post('authenticate', data)
            login(response.data.token);

            history.push('/library');
            alert(`Você está logado como: ${email}`)
        } catch (err) {

            if (err.response.data.error) {
                alert(err.response.data.error)
            } else {
                alert('Email inválido')
            }
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />
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
                        minlength="6"
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