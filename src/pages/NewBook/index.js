import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [nationality, setNationality] = useState('');
    const [year, setYear] = useState('');
    const read = false;

    async function handleBook(e) {
        e.preventDefault();

        const data = ({
            title,
            author,
            nationality,
            year,
            read,
        });

        try {
            const response = await api.post('books', data);

            alert(`Novo livro na estante:\n\n${response.data.title}`);
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div className="new-book-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="My Books" />

                    <h1>Cadastrar novo livro</h1>
                    <p>Digite os dados do novo livro ao lado</p>

                    <Link className="back-link" to="/library">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Minha Estante
                    </Link>
                </section>

                <form onSubmit={handleBook}>
                    <input
                        placeholder="Titulo"
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Autor"
                        value={author}
                        required
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input
                        placeholder="Nacionalidade"
                        value={nationality}
                        required
                        onChange={e => setNationality(e.target.value)}
                    />
                    <input
                        placeholder="Ano"
                        value={year}
                        required
                        onChange={e => setYear(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>

        </div>
    );
}