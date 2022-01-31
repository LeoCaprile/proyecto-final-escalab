import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {ReactComponent as Star} from '../assets/star.svg'

const Cocktail = ({strDrinkThumb,strDrink,idDrink}) => {

  const [star, setStar] = useState(false); 
  
  useEffect(()=>{
  handleFavoriteOnRender(idDrink);
  },[])

  
  const handleFavoriteOnRender = (id) =>{
  const localArr = JSON.parse(localStorage.getItem('favorites'));
  if(localArr.find(favId => favId === id)){
    setStar(!star);
  }
  }
  const handleFavorite = (id) =>{
  const localArr = JSON.parse(localStorage.getItem('favorites'));

  if(localArr.find(favId => favId === id)){
    setStar(!star);
    const newArr = localArr.filter((favId)=>favId !== id);
    localStorage.setItem('favorites', JSON.stringify(newArr));

  }else{
    localArr.push(id);
    localStorage.setItem('favorites', JSON.stringify(localArr));
    setStar(!star);
  }

  } 

  return (
  <div className='flex flex-col gap-5 items-center justify-center p-5 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300 ease-linear'>
      
      <img className='h-3/4 rounded-lg cursor-pointer' src={strDrinkThumb} alt='drink'/>
      <div className='flex justify-around w-full'>
      <h1 className='font-bold text-2xl'>{strDrink}</h1>
      <Star className={`self-center cursor-pointer ${star?'fill-yellow-400':'fill-yellow-100'}`} onClick={()=>{handleFavorite(idDrink)}} />
  
  </div>

  </div>
  )
};



export default Cocktail;
