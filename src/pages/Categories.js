import React, { useEffect, useState } from 'react';
import SelectSearch, { fuzzySearch } from 'react-select-search'
import { getCocktailsCategories } from '../constants';
import Cocktails from '../components/Cocktails';
import axios from 'axios';
import OptionSelect from '../components/OptionSelect';

export default function Categories() {

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('');


  const getCategories = async () =>{
 
      const {data} = await axios.get(getCocktailsCategories())
      const categoriesData = await data.drinks.map(item=>{return {name: item.strCategory, value:item.strCategory}});
      setCategories(categoriesData)
  }

  useEffect(()=>{
    getCategories()
  },[])

  return (
  <div>
  <h1 className='font-bold text-3xl text-center bg-green-200 p-5'>Buscar cocktails por categorias </h1>
  <div className='flex justify-center p-10'><OptionSelect setCategory={setCategory} options={categories}></OptionSelect></div> 
  <section className='grid grid-cols-1 md:grid-cols-4 gap-10 grid-rows-2 p-5 h-full'>
  {category && <Cocktails type='categories' category={category}></Cocktails>}
  </section>
  </div>);
}
