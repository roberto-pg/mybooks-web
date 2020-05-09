import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewIncident() {
    return (
        <div className="new-incident-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="My Books" />

                    <h1>Cadastrar novo livro</h1>
                    <p>Digite os dados do novo livro ao lado</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para lista
                    </Link>
                </section>

                <form>
                    <input placeholder="Titulo" />
                    <input placeholder="Autor" />
                    <input placeholder="Nacionalidade" />
                    <input placeholder="Ano" />
        
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>

        </div>
    );
}