import React from 'react';
import Navbar from './Navbar';
const Header = () => {
  return <div className='bg-green-300 md:w-full md:h-28 h-20 flex md:flex-col flex-row-reverse items-center justify-center '>
    <h1 className='text-3xl font-bold hover:scale-110 transition-transform duration-200 ease-linear'>🍹Cocktails!🍸</h1>
    <Navbar></Navbar>
  </div>;
};

export default Header;
