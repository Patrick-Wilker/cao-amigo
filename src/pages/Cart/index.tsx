import React from 'react';

import Header from '../../components/Header';

import {FaTrashAlt} from 'react-icons/fa';
import './styles.css';

export default function Cart(){
    return (
        <>
            <Header/>

            <div className="cart-status">
                <h1>O total da sua sacola é de R$ 400,00</h1>
                <p>Frete grátis em todos os pedidos</p>
                <button className="buy">Pagar</button>
                <h1>Sua sacola está vazia</h1>
            </div>
        
            <div className="cart">
                
                <ul className="dogs">
                    <li>
                        <figure>
                            <img 
                                src="https://images.dog.ceo/breeds/basenji/n02110806_1013.jpg"
                                alt="Dog"
                            />
                        </figure>
                        <section>
                            <div className="data">
                                <p><strong>Nome:</strong>search.name</p>
                                <p><strong>Cor:</strong> search.color</p>
                                <p><strong>Sexo:</strong> search.gender</p>
                                <p><strong>Idade:</strong> search.age</p>
                                <p><strong>Preço:</strong> search.price</p>
                            </div>

                            <button>
                                <div><FaTrashAlt size={16} color="#FFF"/></div>
                                <span>Remover</span>
                            </button>
                        </section>
                    </li>
                    <li>
                        <figure>
                            <img 
                                src="https://images.dog.ceo/breeds/basenji/n02110806_1013.jpg"
                                alt="Dog"
                            />
                        </figure>
                        <section>
                            <div className="data">
                                <p><strong>Nome:</strong>search.name</p>
                                <p><strong>Cor:</strong> search.color</p>
                                <p><strong>Sexo:</strong> search.gender</p>
                                <p><strong>Idade:</strong> search.age</p>
                                <p><strong>Preço:</strong> search.price</p>
                            </div>

                            <button>
                                <div><FaTrashAlt size={16} color="#FFF"/></div>
                                <span>Remover</span>
                            </button>
                        </section>
                    </li>
                    <li>
                        <figure>
                            <img 
                                src="https://images.dog.ceo/breeds/basenji/n02110806_1013.jpg"
                                alt="Dog"
                            />
                        </figure>
                        <section>
                            <div className="data">
                                <p><strong>Nome:</strong>search.name</p>
                                <p><strong>Cor:</strong> search.color</p>
                                <p><strong>Sexo:</strong> search.gender</p>
                                <p><strong>Idade:</strong> search.age</p>
                                <p><strong>Preço:</strong> search.price</p>
                            </div>

                            <button>
                                <div><FaTrashAlt size={16} color="#FFF"/></div>
                                <span>Remover</span>
                            </button>
                        </section>
                    </li>
                </ul>

                <hr/>
                <div className="total-again">
                    <p>Subtotal:<strong>R$ 400,00</strong></p>
                    <p>Envio: <strong>Grátis</strong></p>
                    <hr/>
                    <p><strong>Total:</strong><strong>R$ 400,00</strong></p>
                    <button className="buy">Pagar</button>
                </div>
            </div>
        </>
    );
}