import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiEdit } from 'react-icons/fi';

import api from '../../services/api';
import { logout } from '../../services/auth';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Library() {
    const [book, setBook] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('books').then(response => {
            setBook(response.data.data);
        })
    }, []);

    function handleEdit(id) {
        history.push(`/detail/${id}`);

    }

    function handleLogout() {
        logout();
        history.push('/')
    }

    return (
        <div className="library-container">
            <header>
                <img src={logoImg} alt="My Books" />

                <Link className="buttonBook" to='/books/new'>Cadastrar book</Link>

                <Link className="buttonUser" to='/register'>Cadastrar usuário</Link>
                <button onClick={handleLogout} type="button">
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
                            <p>{(book.read === true) ? "Lido" : "Não lido"}</p>
                        </section>

                        <button onClick={() => handleEdit(book.id)} type="button">
                            <FiEdit size={20} color="#a8a8b3" />
                        </button>

                    </li>
                ))}
            </ul>

        </div>
    );
}


























