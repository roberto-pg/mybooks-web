import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Detail(props) {
    let { id } = props.match.params;
    const [book, setBook] = useState([]);

    useEffect(() => {
        api.get(`books/id/${id}`).then(response => {
            setBook(response.data.data);
            console.log(book);
        })
    }, []);

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
                        <p>{book.read}</p>
                        <container className="status">
                            <label htmlFor="read">Leu o livro?</label>
                            <select className="read" name="read">
                                <option selected value="false">Sim</option>
                                <option value="true">Não</option>
                            </select>
                        </container>
                    </div>
                    <div className="alterar">
                        <input className="detail" type="submit" value="Alterar" />
                        <input className="delete" type="submit" value="Deletar" />
                    </div>
                    <Link className="back-link" to="/library">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Minha Estante
                    </Link>
                </section>
            </div>
        </div>
    );
}