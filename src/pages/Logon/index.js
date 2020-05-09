import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';
import capaImg from '../../assets/capa.jpg';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogon(e) {
        e.preventDefault();

        const data = ({
            email, password
        })

        try {
            const response = await api.post('authenticate', data)

            alert('Ok')
            console.log(response.data.token);
        } catch (err) {

            alert('NO')
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

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={capaImg} alt="Capa" />
        </div>
    );
}