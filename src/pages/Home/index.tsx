import React, {useState ,useEffect, FormEvent} from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {formatPrice} from '../../util/format';

import Header from '../../components/Header';

import ModernWoman from '../../assets/images/modern_woman.svg';
import {FaPlus, FaSpinner} from 'react-icons/fa';

import api from '../../services/api';

import './styles.css';

export default function Home(){

    const [breeds, setBreeds] = useState([]);
    const [subBreeds, setSubBreeds] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [buyDog, setBuyDog] = useState([
        {image: '', name: '', color: '', gender: '', age: 1, price: 30}
    ])
    const [search, setSearch] = useState(
        {breed: 'affenpinscher', subBreed: '', name: '', color: 'Branco', gender: 'Macho', age: 1, price: 30},
    )

    useEffect(()=>{
        async function loadDatas(){
            const response =  await api.get('breeds/list');

            setBreeds(response.data.message);

            /**Carregando os dados dos inputs caso tenha tido um refresh */
            const savedSearch = localStorage.getItem('search')
            if(savedSearch){
                setSearch(JSON.parse(savedSearch))
            }

            /**Carregando as sub-racas para o select */
            const savedSubBreeds = localStorage.getItem('subBreeds')
            if(savedSubBreeds){
                setSubBreeds(JSON.parse(savedSubBreeds))
            }

            /**Carregando os cachorros já adquiridos */
            let acquiredDog = localStorage.getItem('buyDog');
            if(acquiredDog){
                setBuyDog(JSON.parse(acquiredDog))
            }

        }
        loadDatas();

    }, [])

    useEffect(()=>{
        function newPrice(){
            let updatePrice
            if(search.gender === 'Fêmea' || search.color === 'Marrom'){
                updatePrice = {
                    ...search, price: 50
                };
            }
            else if(search.color === 'Preto'){
                updatePrice = {
                    ...search, price: 60
                };
            }
            else{
                updatePrice = {
                    ...search, price: 30
                };
            }

            if(updatePrice){
                setSearch(updatePrice)
            }
        }

        newPrice()
        // eslint-disable-next-line
    }, [search.gender, search.color])

    function handleUpdate(field: string, value: string | number){

        if(field === 'age'){
            value = Number(value)
        }

        const updateSearch = { 
            ...search, [field]: value
        };

        setSearch(updateSearch);

        localStorage.setItem('search', JSON.stringify(updateSearch));

    }

    async function handleSubBreeds(){
        const response = await api.get(`breed/${search.breed}/list`)

        if(response.data.message.length > 0){
            setSubBreeds(response.data.message);
            localStorage.setItem('subBreeds', JSON.stringify(response.data.message));
        }else{
            setSubBreeds([]);
            localStorage.removeItem('subBreeds');
        }
    }

    async function handleImages(){

        document.getElementById('results')?.classList.remove('d-none')   

        setLoading(true)

        if(subBreeds.length > 1){
            const response = await api.get(`breed/${search.breed}/${search.subBreed}/images`);

            setImages(response.data.message);
        }else{
            const response = await api.get(`breed/${search.breed}/images`);

            setImages(response.data.message);
        }

        setLoading(false)
    }

    async function handleSearch(e: FormEvent){
        e.preventDefault();

        const schema = Yup.object().shape({
            breed: Yup
                .string()
                .default('affenpinscher')
                .required('Raça é obrigatória'),
            subBreed: Yup
                .string(),
            name: Yup
                .string()
                .required('Nome é obrigatório')
                .min(3, 'Nome deve ter no mínimo 3 caracteres')
                .max(5, 'Nome deve ter no máximo 5 caracteres'),
            age: Yup
                .number().typeError('Informe uma idade válida')
                .required('Idade é obrigatória')
                .min(1, 'Idade mínima é de 1 ano')
                .max(15, 'Idade máxima é de 15 anos'),
            color: Yup
                .string()
                .required('Cor é obrigatória'),
            gender: Yup
                .string()
                .required('Gênero é obrigatória')        
        });

        try {
            await schema.validate(search, { abortEarly: false });

            handleImages()

        } catch (err) {
            toast.info(err.errors[0])
        }

    }

    function handleAddCart(image: string, name: string, color: string, gender: string, age: number, price: number){
        
        let acquiredDog = localStorage.getItem('buyDog');

        if(acquiredDog){
            const newDog = [
                ...buyDog, {image: image, name: name, color: color, gender: gender, age: age, price: price}
            ];

            setBuyDog(newDog);

            localStorage.setItem('buyDog', JSON.stringify(newDog));
        }else{
            const newDog = [
                {image: image, name: name, color: color, gender: gender, age: age, price: price}
            ];

            setBuyDog(newDog);

            localStorage.setItem('buyDog', JSON.stringify(newDog));
        }
        toast.success('Novo amigo adicionado ao carrinho de compras');
        
    }

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
                <form onSubmit={handleSearch}>
                    <h2>Busque pelo seu novo <span>amigo</span></h2>
                    <hr/>
                    <div className="fields">
                        <div className="field">
                            <label htmlFor="breed">Selecione uma raça:</label>
                            <select 
                                name="breed" 
                                id="breed" 
                                value={search.breed}
                                required
                                onClick = {handleSubBreeds} 
                                onChange= {e => handleUpdate('breed', e.target.value)}
                            >
                                {breeds.map((breed, i)=>{
                                    return <option key={i} value={breed}>{breed}</option>
                                })}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="subBreed">Selecione uma sub-raça:</label>
                            <select name="subBreed" id="subBreed" value={search.subBreed} onChange= {e => handleUpdate('subBreed', e.target.value)}>
                                {subBreeds && subBreeds.map((subBreed, i)=>{
                                    return <option key={i} value={subBreed} >{subBreed}</option>
                                })}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nome:</label>
                            <input 
                                name="name" 
                                id="name" 
                                type="text" 
                                minLength={3} maxLength={5} required
                                value={search.name}
                                onChange= {e => handleUpdate('name', e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="gender">Sexo:</label>
                            <select name="gender" id="gender" required value={search.gender} onChange= {e => handleUpdate('gender', e.target.value)}>
                                <option value="Macho">Macho</option>
                                <option value="Fêmea">Fêmea</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="color">Cor:</label>
                            <select name="color" id="color" required value={search.color} onChange= {e => handleUpdate('color', e.target.value)}>
                                <option value="Branco">Branco</option>
                                <option value="Preto">Preto</option>
                                <option value="Marrom">Marrom</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="age">Idade:</label>
                            <input 
                                name="age" 
                                id="age" 
                                type="number"
                                value={search.age}
                                min={1} max={15} required
                                onChange= {e => handleUpdate('age', e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="price">Preço:</label>
                            <input type="number" id="price" value={search.price} readOnly/>
                        </div>
                    </div>

                    <button type="submit">
                        BUSCAR
                    </button>
                </form>

                <div id="results" className="results d-none">
                    <hr/>
                    <h3>Resultados:</h3>
                    <ul>
                        {loading ? <div className="loading"><FaSpinner color="#552820" size={50}/></div> : 
                            <>
                                {images.length > 0 ? images.map((image, i)=>{
                                    return (
                                        <li key={i}>
                                            <figure>
                                                <img 
                                                    src={image}
                                                    alt="Dog"
                                                />
                                            </figure>
                                            <section>
                                                <div className="data">
                                                    <p><strong>Nome:</strong> {search.name}</p>
                                                    <p><strong>Cor:</strong> {search.color}</p>
                                                    <p><strong>Sexo:</strong> {search.gender}</p>
                                                    <p><strong>Idade:</strong> {search.age}</p>
                                                    <p><strong>Preço:</strong> {formatPrice(search.price)}</p>
                                                </div>
                        
                                                <button 
                                                    onClick={()=>handleAddCart(image,search.name, search.color,search.gender,search.age,search.price)}
                                                >
                                                    <div><FaPlus size={16} color="#FFF"/></div>
                                                    <span>ADQUIRIR</span>
                                                </button>
                                            </section>
                                            
                                        </li>
                                    )    
                                }) : <h4>Nenhum cão encontrado</h4>}
                            </>
                        }
                        
                    </ul>
                </div>
            </main>
            
        </>
    );
}