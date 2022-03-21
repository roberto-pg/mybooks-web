import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';



export default function Detail() {
  let { id } = useParams();
  const [book, setBook] = useState([]);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`books/${id}`).then(response => {
      setBook(response.data);
    })
  }, [id]);

  async function handleDelete() {
    try {
      await api.delete(`books/${id}`)
      navigate('/library')
    } catch (err) {
      alert('Erro ao deletar o livro');
    }
  }

  async function handleStatus() {
    try {
      if (status === "") {
        alert('Escolha o Status de leitura')
      } else {
        const data = { read: status };
        await api.patch(`books/${id}`, data);
        navigate('/library')
      }
    } catch (err) {
      alert('Erro ao alterar o status de leitura');
    }
  }

  async function handleCover(e) {
    var formData = new FormData();
    formData.append('imageurl', image);

    try {
      await api.put(`/books/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      )
      navigate('/library')
    } catch (err) {
      alert('Erro ao alterar a capa do livro');
    }
  }

  return (
    <div className="detail-container">
      <div className="content">

        <section className="secImg">
          <img className="livro" src={book.imageurl} alt="livro" />
          <Link className="back-link" to="/library">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Minha Estante
          </Link>
        </section>

        <section className="secDados">

          <div className="dados">
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.nationality}</p>
            <p>{book.year}</p>
            <div className="leitura">
              <p>Status:</p>
              <p>{(book.read === true) ? "Lido" : "Não lido"}</p>
            </div>
            <div className="status">
              <label htmlFor="read">Mudar Status:</label>
              <select className="leitura" value={status} onChange={e => setStatus(e.target.value)}>
                <option></option>
                <option value="true">Lido</option>
                <option value="false">Não Lido</option>
              </select>
              <div className="alterar">
                <button className="altStatus" onClick={() => {
                  if (window.confirm('Tem certeza que quer alterar este livro?')) handleStatus()
                }} type="button">
                  <FiCheckCircle size={18} color="#e02041" />
                </button>
              </div>
            </div>
            <div className="capa">
              <label className="labelCapa" htmlFor="ima">Trocar capa:</label>
              <input onChange={e => setImage(e.target.files[0])} className="ima" type="file" id="imageurl" name="imageurl" />
              <button onClick={handleCover} className="altCapa" type="button"><FiCheckCircle size={18} color="#e02041" /></button>
            </div>
            <div className="back-link" onClick={() => {
              if (window.confirm('Tem certeza que quer excluir este livro?')) handleDelete(book.id)
            }}>
              <FiTrash2 size={18} color="#e02041" />
              Excluir o livro da coleção
            </div>
          </div>

        </section>
      </div>
    </div >
  );
}