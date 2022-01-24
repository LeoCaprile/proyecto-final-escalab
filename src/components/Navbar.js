import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.li`
padding:0.5rem;
border-radius: 200px;
&:hover{
  background-color: rgb(74,222,128);
}

`

const Navbar = () => {
  return <nav> 
    <ul className='flex gap-5 justify-center bg-green-300 text-lg pb-2'>
    <Link to='/'><Button>Cocktails</Button></Link>
    <Link to='/'><Button>Categorias</Button></Link>
    <Link to='/'><Button>Cocktail Aleatorio</Button></Link>
    <Link to='/'><Button>Favoritos</Button></Link>

    </ul>
  </nav>;
};

export default Navbar;
