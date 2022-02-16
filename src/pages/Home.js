import React from 'react';
import Cocktails from '../components/Cocktails';

const Home = () => {

  return (
  <div>
  <h1 className='font-bold text-3xl text-center bg-green-200 p-5'>Cocktails populares! 📈</h1>
   <section className='grid grid-cols-1 md:grid-cols-4 gap-10 grid-rows-2 p-5 h-full'>
    <Cocktails type="popular"></Cocktails>
  </section>

  <h1 className='font-bold text-3xl text-center bg-green-200 p-5'>Ultimos Cocktails! 🆕✨</h1>
  <section className='grid grid-cols-1 md:grid-cols-4 gap-10 grid-rows-2 p-5 h-full'>
    <Cocktails type="latest"></Cocktails>
  </section>
  </div>

 )
};

export default Home;
