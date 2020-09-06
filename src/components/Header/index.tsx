import React from 'react';
import {Link} from 'react-router-dom';

import {FaPaw, FaShoppingBag} from 'react-icons/fa'; 

import './styles.css'

export default function Header(){

    return(
        <header>
            <div className="content">
                <Link to="/">
                    <FaPaw/>
                </Link>
                <Link to="/cart">
                    <FaShoppingBag/>
                </Link>
            </div>
        </header>
    )
}