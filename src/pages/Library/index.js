import React, { useEffect, useState } from 'react';
import { FiEdit, FiPower } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import { logout } from '../../services/auth';
import './styles.css';




export default function Library() {
  const [book, setBook] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('books').then(response => {
      setBook(response.data);
      setTotal(response.headers['x-total-count']);
    })
  }, []);

  function handleEdit(id) {
    navigate(`/detail/${id}`);
  }

  function handleLogout() {
    logout();
    navigate('/')
  }

  return (
    <div className="library-container">
      <header>
        <img className="logo" src={logoImg} alt="My Books" />

        <Link className="buttonBook" to='/books/new'>Cadastrar book</Link>

        <Link className="buttonUser" to='/register'>Cadastrar usuário</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#f49e00" />
        </button>

      </header>
      <header>
        <h1>Minha Estante</h1>
        <h4>Total de livros: {total}</h4>
      </header>

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


























