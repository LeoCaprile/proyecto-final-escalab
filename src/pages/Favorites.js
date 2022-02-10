import React from 'react'; 
import Cocktails from '../components/Cocktails';

import { getUserFavorites } from '../components/Cocktail';

export default function Favorites() {


  return (
  <div>
  <h1 className='font-bold text-3xl text-center bg-green-200 p-5'>💖 Cocktails favoritos! 💖</h1>
   <section className='grid grid-cols-1 md:grid-cols-4 gap-10 grid-rows-2 p-5 h-full'>
    <Cocktails getUserFavorites={getUserFavorites}></Cocktails>
  </section>
  </div>
  );
}
