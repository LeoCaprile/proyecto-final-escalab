import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cocktails from '../components/Cocktails';
import Error from '../components/Error';
import { getCocktailsIngredients } from '../constants';
import OptionSelect from '../components/OptionSelect'

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState('');
  const [error, setError] = useState(false)

  const getIngredients = async () =>{
      try{
        const {data} = await axios.get(getCocktailsIngredients())
      const ingredientsData = await data.drinks.map(item=>{return {name: item.strIngredient1, value:item.strIngredient1}});
      setIngredients(ingredientsData)
      }
      catch(error){
        setError(true)
      }
  }

  useEffect(()=>{
    getIngredients()
  },[])

  if(error){return <Error></Error>}

  return (
  <div>
  <h1 className='font-bold text-3xl text-center bg-green-200 p-5'>Buscar cocktails por ingrediente </h1>
  <div className='flex justify-center p-10'><OptionSelect setCategory={setIngredient} options={ingredients}></OptionSelect></div> 
  <section className='grid grid-cols-1 md:grid-cols-4 gap-10 grid-rows-2 p-5 h-full'>
  {ingredient && <Cocktails type='ingredients' category={ingredient}></Cocktails>}
  </section>
  </div>);
}

