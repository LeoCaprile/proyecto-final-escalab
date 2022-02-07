import React from 'react';
import { Link,} from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

//styled div
const Button = styled.div`
padding:0.5rem;
border-radius: 200px;
cursor:pointer;
&:hover{
  background-color: rgb(74,222,128);
}
`

const Navbar = () => {

  const {currentUser,logout} = useAuth();

  const reloadPage = () => {
    window.location.reload();
  }

  return <nav className='flex gap-5 justify-center bg-green-300 text-lg pb-2'> 
    
    <Link to='/'><Button>Cocktails</Button></Link>
    <Link to='/categories'><Button>Categorias</Button></Link>
    <Link to='/ingredients'><Button>Ingredientes</Button></Link>
    <Link to='/random'><Button>Cocktail Aleatorio</Button></Link>
    {currentUser?<Link to='/favorites'><Button>Mis Favoritos</Button></Link>:''}
    {currentUser?<Link to='/'><Button onClick={()=>{logout();reloadPage()}}>Cerrar Sesion</Button></Link>:<Link to='/login'><Button>Iniciar sesion</Button></Link>}
    
  
  </nav>;
};

export default Navbar;
