import React from 'react';

import Header from '../../components/Header';

import ModernWoman from '../../assets/images/modern_woman.svg';
import {FaPlus} from 'react-icons/fa';

import './styles.css';

export default function Home(){
    return (
        <>
            <Header/>
            <div className="apresentation">
                <div className="text">
                    <h1>Encontre o seu melhor amigo aqui</h1>
                    <p>
                        <strong>"Ninguém se pode queixar da falta de um amigo, podendo ter um cão"</strong> 
                        &nbsp;- Marquês de Maricá
                    </p>
                </div>
                <figure>
                    <img src={ModernWoman} alt="Modern woman"/>
                </figure>
            </div>
            <main>
                <form action="">
                    <h2>Busque pelo seu novo <span>amigo</span></h2>
                    <hr/>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="breed">Selecione uma raça:</label>
                            <select name="breed" id="breed">
                                <option value="Selecione" >Selecione</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="subBreed">Selecione uma sub-raça:</label>
                            <select name="subBreed" id="subBreed">
                                <option value="Selecione" >Selecione</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nome:</label>
                            <input name="name" id="name" type="text"/>
                        </div>
                        <div className="field">
                            <label htmlFor="gender">Sexo:</label>
                            <select name="gender" id="gender">
                                <option value="male">Macho</option>
                                <option value="female">Fêmea</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="color">Cor:</label>
                            <select name="color" id="color">
                                <option value="white">Branco</option>
                                <option value="black">Preto</option>
                                <option value="brown">Marrom</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="age">Idade:</label>
                        <   input name="age" id="age" type="number"/>
                        </div>
                    </div>

                    <button>
                        BUSCAR
                    </button>
                </form>

                <div className="results">
                    <hr/>
                    <h3>Resultados:</h3>

                    <ul>
                        <li>
                            <figure>
                                <img 
                                    src="https://images.dog.ceo/breeds/terrier-yorkshire/n02094433_126.jpg"
                                    alt="Dog"
                                />
                            </figure>
                            <section>
                                <div className="data">
                                    <p><strong>Nome:</strong> Nome</p>
                                    <p><strong>Cor:</strong> Cor</p>
                                    <p><strong>Sexo:</strong> Sexo</p>
                                    <p><strong>Idade:</strong> Idade</p>
                                    <p><strong>Preço:</strong> Preço</p>
                                </div>
        
                                <button>
                                    <div><FaPlus size={16} color="#FFF"/></div>
                                    <span>ADQUIRIR</span>
                                </button>
                            </section>
                            
                        </li>
                        <li>
                            <figure>
                                <img 
                                    src="https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_19486.jpg"
                                    alt="Dog"
                                />
                            </figure>

                            <section>
                               <div className="data">
                                    <p><strong>Nome:</strong> Nome</p>
                                    <p><strong>Cor:</strong> Cor</p>
                                    <p><strong>Sexo:</strong> Sexo</p>
                                    <p><strong>Idade:</strong> Idade</p>
                                    <p><strong>Preço:</strong> Preço</p>
                                </div>
        
                                <button>
                                    <div><FaPlus size={16} color="#FFF"/></div>
                                    <span>ADQUIRIR</span>
                                </button>
                            </section>
                            
                        </li>
                        <li>
                            <figure>
                                <img 
                                    src="https://images.dog.ceo/breeds/bulldog-french/n02108915_4176.jpg"
                                    alt="Dog"
                                />
                            </figure>
                            <section>
                                <div className="data">
                                    <p><strong>Nome:</strong> Nome</p>
                                    <p><strong>Cor:</strong> Cor</p>
                                    <p><strong>Sexo:</strong> Sexo</p>
                                    <p><strong>Idade:</strong> Idade</p>
                                    <p><strong>Preço:</strong> Preço</p>
                                </div>
        
                                <button>
                                    <div><FaPlus size={16} color="#FFF"/></div>
                                    <span>ADQUIRIR</span>
                                </button>
                            </section>
                           
                        </li>
                    </ul>
                </div>
            </main>
            
        </>
    );
}