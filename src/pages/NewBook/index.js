import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import './styles.css';



export default function NewBook() {
  const navigate = useNavigate();

  async function handleBook(e) {
    e.preventDefault();

    var myForm = document.getElementById('myForm');
    var formData = new FormData(myForm);

    try {
      const response = await api.post('books', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      alert(`Novo livro na estante:\n\n${response.data.title}`);
      myForm.reset();
      navigate('/library')
    } catch (err) {
      alert('Falha no cadastro\n\nEscolha uma imagem com o formato:\npng\njpg\njpeg\ngif');
    }
  }

  return (
    <div className="new-book-container">

      <div className="content">
        <section>
          <img className="imag" src={logoImg} alt="My Books" />

          <h1>Cadastrar novo livro</h1>
          <p>Digite os dados do novo livro ao lado</p>

          <Link className="back-link" to="/library">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Minha Estante
          </Link>
        </section>

        <form onSubmit={handleBook} id="myForm" name="myForm">
          <input placeholder="Título:" type="text" id="author" name="title" required />
          <input placeholder="Autor:" type="text" id="author" name="author" required />
          <input placeholder="País:" type="text" id="nationality" name="nationality" required />
          <input placeholder="Ano:" type="number" id="year" name="year" required />
          <container className="status">
            <label htmlFor="read">Já leu?</label>
            <select className="read" name="read">
              <option selected value="false">Não lido</option>
              <option value="true">Lido</option>
            </select>
          </container>
          <container className="capa">
            <label htmlFor="ima">Capa:</label>
            <input className="ima" type="file" id="imageurl" name="imageurl" />
          </container>


          <input className="sub" type="submit" value="Cadastrar" />
        </form>
      </div>
    </div>
  );
}