import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Detail(props) {
    let { id } = props.match.params;
    const [book, setBook] = useState([]);
    const [status, setStatus] = useState('');
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

    return (
        <div className="detail-container">
            <div className="content">

                <section className="secImg">
                    <img className="livro" src={book.imageurl} alt="livro" />
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
                        <container className="status">
                            <label htmlFor="read">Alterar Status:</label>
                            <select className="leitura" value={status} onChange={e => setStatus(e.target.value)}>
                                <option></option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                            <div className="alterar">
                                <button onClick={''} type="button">
                                    <FiCheckCircle size={18} color="#f49e00" />
                                </button>
                                {/* <input onClick={() => {
                                    if (window.confirm('Tem certeza que quer alterar este livro?')) handleStatus()
                                }}
                                    className="detail"
                                    type="submit"
                                    value="Alterar"
                                /> */}
                            </div>
                        </container>



                        <input onClick={() => {
                            if (window.confirm('Tem certeza que quer excluir este livro?')) handleDelete(book.id)
                        }}
                            className="delete"
                            type="submit"
                            value="Deletar"
                        />
                    </div>

                    <Link className="back-link" to="/library">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Minha Estante
                    </Link>
                </section>
            </div>
        </div >
    );
}