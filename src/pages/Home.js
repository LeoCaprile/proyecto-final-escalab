import React from 'react';
import {ReactComponent as Star} from '../assets/star.svg'

const Home = () => {
  return <div className='grid grid-cols-4 gap-10 grid-rows-2 p-5 h-full'>

    <div className='flex flex-col gap-5 items-center justify-center p-5 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300 ease-linear'>
      <Star className='fill-yellow-200 self-end cursor-pointer'></Star>
      <img className='h-3/4 rounded-lg cursor-pointer' src='https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg' alt='drink'/>
      <h1 className='font-bold text-2xl'>Nombre del trago</h1>
    </div>
    
  </div>;
};

export default Home;
