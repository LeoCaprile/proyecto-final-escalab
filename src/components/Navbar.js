import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase/firebase.utils';



const Button = styled.li`
padding:0.5rem;
border-radius: 200px;
cursor:pointer;
&:hover{
  background-color: rgb(74,222,128);
}
`

const Navbar = () => {

  const {currentUser} = useAuth();

  function handleSignOut(){
    signOut(auth)
  }

  return <nav className='flex gap-5 justify-center bg-green-300 text-lg pb-2'> 
    <ul className='flex'>
    <Link to='/'><Button>Cocktails</Button></Link>
    <Link to='/Categorias'><Button>Categorias</Button></Link>
    <Link to='/'><Button>Cocktail Aleatorio</Button></Link>
    {currentUser?<Link to='/'><Button>Mis Favoritos</Button></Link>:''}
    {currentUser?<Button onClick={()=>{handleSignOut()}}>Cerrar Sesion</Button>:<Link to='/login'><Button>Iniciar sesion</Button></Link>}
    
    </ul>
  </nav>;
};

export default Navbar;
