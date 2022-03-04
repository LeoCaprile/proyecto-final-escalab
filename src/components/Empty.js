import React from 'react'
import { ReactComponent as Star } from '../assets/star.svg'

export default function Empty() {
  return (
    <div className='text-center  justify-center col-start-2  text-3xl'>
      <h1 className='pb-5'>No posees ningun cocktail favorito!😟</h1>

    <div className='flex flex-col items-center gap-5 justify-center p-5 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300 ease-linear'>
      
      <img width={400} className='h-3/4 rounded-lg cursor-pointer' src="https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg" alt='drink' loading='lazy'/>
    
      <div className='flex justify-around w-full'>
        <h1 className='font-bold text-2xl'>Mojito</h1>
        <Star className={`self-center outline-2 outline-black cursor-pointer fill-yellow-400 animate-bounce `} />
    
      </div>

    </div>

      <h1 className='py-5'>Busca algún cocktail y presiona la estrellita ⭐ para agregarlo a tus favoritos</h1>
      
    </div>
  )
}
