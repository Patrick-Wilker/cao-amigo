import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {formatPrice} from '../../util/format';

import Header from '../../components/Header';

import {FaTrashAlt} from 'react-icons/fa';
import './styles.css';

export default function Cart(){

    const [buyDog, setBuyDog] = useState([
        {image: '', name: '', color: '', gender: '', age: 1, price: 30}
    ]);
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        function loadDatas(){
            /**Carregando os cachorros já adquiridos */
            let acquiredDog = localStorage.getItem('buyDog');
            if(acquiredDog){
                setBuyDog(JSON.parse(acquiredDog))
            }else{
                setBuyDog([])
            }

            
        }
        loadDatas()
    },[])

    useEffect(()=>{
        function total(){
            let value = 0
            buyDog.map((dog, i)=>{
                return value += dog.price
            })
            setTotal(value)
        }
        total()
    }, [buyDog])

    function updateTotal(){
        let value = 0
        buyDog.map((dog, i)=>{
            return value += dog.price
        })
        setTotal(value)
    }
    

    function removeDog(id: number){
        buyDog.splice(id, 1);
        setBuyDog(buyDog);

        localStorage.setItem('buyDog', JSON.stringify(buyDog));
        updateTotal()

        toast.success('Removido com sucesso');
    }

    function checkout(){
        localStorage.removeItem('buyDog');
        setBuyDog([])
        setTotal(0)

        toast.success('Compra finalizada com sucesso')
    }

    return (
        <>
            <Header/>

            <div className="cart-status">

                {buyDog.length > 0 ? 
                    <>
                        <h1>O total de seu carrinho é de {formatPrice(total)}</h1>
                        <p>Frete grátis em todos os pedidos</p>
                        <button className="buy" onClick={checkout}>Pagar</button>
                    </>
                    :<h1>Seu carrinho está vazio</h1>
                }
                
            </div>

            
            <div className="cart">
                
                <ul className="dogs">

                    {buyDog.map((dog, i)=>{
                            return (<li key={i}>
                                <figure>
                                    <img 
                                        src={dog.image}
                                        alt="Dog"
                                    />
                                </figure>
                                <section>
                                    <div className="data">
                                        <p><strong>Nome:</strong> {dog.name}</p>
                                        <p><strong>Cor:</strong> {dog.color}</p>
                                        <p><strong>Sexo:</strong> {dog.gender}</p>
                                        <p><strong>Idade:</strong> {dog.age}</p>
                                        <p><strong>Preço:</strong> {formatPrice(dog.price)}</p>
                                    </div>

                                    <button onClick={()=>removeDog(i)}>
                                        <div><FaTrashAlt size={16} color="#FFF"/></div>
                                        <span>Remover</span>
                                    </button>
                                </section>
                            </li>)
                        })
                        
                    }
                </ul>

                {buyDog.length > 0 && 
                    <>
                    <hr/>
                    <div className="total-again">
                        <p>Subtotal:<strong>{formatPrice(total)}</strong></p>
                        <p>Envio: <strong>Grátis</strong></p>
                        <hr/>
                        <p><strong>Total:</strong><strong>{formatPrice(total)}</strong></p>
                        <button className="buy" onClick={checkout}>Pagar</button>
                    </div>
                    </> 
                }
                
            </div>
        </>
    );
}