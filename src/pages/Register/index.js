import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({
            email, password
        });

        try {
            const response = await api.post('users', data);

            alert(`Cadastro efetuado com sucesso\nPara acesso utilize o email: ${response.data.user.email}`);
            history.push('/');
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

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
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