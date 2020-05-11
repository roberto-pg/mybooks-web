import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Library() {
    const [book, setBook] = useState([]);
    let lido = "";

    useEffect(() => {
        api.get('books').then(response => {
            setBook(response.data.data);
        })
    }, []);

    if (book.read === true) {
        lido = "Lido";
    } else {
        lido = "Não lido"
    }

    return (
        <div className="library-container">
            <header>
                <img src={logoImg} alt="My Books" />

                <Link className="button" to='/books/new'>Cadastrar book</Link>

                <Link className="button" to='/register'>Cadastrar usuário</Link>
                <button type="button">
                    <FiPower size={18} color="#f49e00" />
                </button>

            </header>

            <h1>Minha Estante</h1>


            <ul>
                {book.map(book => (

                    <li key={book.id}>
                        <section>
                            <img className="capa" src={book.imageurl} alt="imagem" />
                        </section>
                        <section>
                            <p>{book.title}</p>
                            <p>{book.year}</p>
                            <p>{book.author}</p>
                            <p>{lido}</p>
                        </section>

                        <button type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}


























