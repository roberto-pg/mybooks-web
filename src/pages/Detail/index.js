import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Detail(props) {
    let { id } = props.match.params;
    const [book, setBook] = useState([]);
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');
    const history = useHistory();

    useEffect(() => {
        api.get(`books/id/${id}`).then(response => {
            setBook(response.data.data);
        })
    }, [id]);

    async function handleDelete() {
        try {
            await api.delete(`books/${id}`)
            history.push('/library')
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
                history.push('/library')
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
            history.push('/library')
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
                            <p>{(book.read === true) ? "Lido" : "N??o lido"}</p>
                        </div>
                        <container className="status">
                            <label htmlFor="read">Mudar Status:</label>
                            <select className="leitura" value={status} onChange={e => setStatus(e.target.value)}>
                                <option></option>
                                <option value="true">Sim</option>
                                <option value="false">N??o</option>
                            </select>
                            <div className="alterar">
                                <button className="altStatus" onClick={() => {
                                    if (window.confirm('Tem certeza que quer alterar este livro?')) handleStatus()
                                }} type="button">
                                    <FiCheckCircle size={18} color="#e02041" />
                                </button>
                            </div>
                        </container>
                        <container className="capa">
                            <label className="labelCapa" htmlFor="ima">Trocar capa:</label>
                            <input onChange={e => setImage(e.target.files[0])} className="ima" type="file" id="imageurl" name="imageurl" />
                            <button onClick={handleCover} className="altCapa" type="button"><FiCheckCircle size={18} color="#e02041" /></button>
                        </container>
                        <Link onClick={() => {
                            if (window.confirm('Tem certeza que quer excluir este livro?')) handleDelete(book.id)
                        }} className="back-link">
                            <FiTrash2 size={18} color="#e02041" />
                        Excluir o livro da cole????o
                    </Link>
                    </div>

                </section>
            </div>
        </div >
    );
}