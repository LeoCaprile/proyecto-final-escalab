import React, { useState, useRef, useEffect } from 'react';
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

//custom hook
function useOutsideAlerter(ref,setter) {
  useEffect(() => {
 
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
          setter(false)
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref])}


const Navbar = () => {

  const {currentUser,logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOutsideAlerter(ref, setIsOpen);

  const closeBurgerMenu = () =>{
    setIsOpen(false)
  }

  
  const reloadPage = () => {
    window.location.reload();
  }

  const handleCerrarSesion = () =>{
      logout(currentUser);
      reloadPage();
  }


  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
  <div ref={ref} className='justify-self-end w-24 md:w-full'>

    <div className='md:hidden'>
    <button
        className="flex flex-col h-12 w-12 border-black rounded justify-center items-center group"
        onClick={() => setIsOpen(!isOpen)}>
        <div className={`${genericHamburgerLine} ${
                isOpen
                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
            }`}
        />
        <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`} />
        <div className={`${genericHamburgerLine} ${
                isOpen
                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
            }`}
        />
    </button>
  </div>


    <nav  className={`md:flex gap-5 absolute  md:static left-0 p-10  md:p-0 md:justify-center md:w-full bg-green-300 text-lg pb-2 ${isOpen? '' : 'hidden'}`}> 
    
    <Link onClick={closeBurgerMenu} to='/'><Button>Cocktails</Button></Link>
    <Link onClick={closeBurgerMenu} to='/categories'><Button>Categorias</Button></Link>
    <Link onClick={closeBurgerMenu} to='/ingredients'><Button>Ingredientes</Button></Link>
    <Link onClick={closeBurgerMenu} to='/random'><Button>Cocktail Aleatorio</Button></Link>
    {currentUser?<Link onClick={closeBurgerMenu} to='/favorites'><Button>Mis Favoritos</Button></Link>:''}
    {currentUser?<Link onClick={closeBurgerMenu} to='/'><Button onClick={handleCerrarSesion}>Cerrar Sesion</Button></Link>:<Link onClick={()=>{setIsOpen(false)}} to='/login'><Button>Iniciar sesion</Button></Link>}
    
  
    </nav>
  </div>)
};

export default Navbar;
