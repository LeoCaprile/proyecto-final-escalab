import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cocktail from './Cocktail';

const Cocktails = ({cocktailApiUrl}) => {

  const [cocktails, setCocktails] = useState([]);
  
  useEffect(()=>{
    getCocktails()
  },[])

  const getCocktails = async () =>{
    const {data} = await axios.get(cocktailApiUrl)
    const cocktailsData = await data.drinks;
    cocktailsData.length = 8;
    setCocktails(cocktailsData)
  }

  return (cocktails.map(({idDrink, ...cocktail})=>{
    return <Cocktail key={idDrink} idDrink={idDrink} {...cocktail}></Cocktail>
  }));
};

export default Cocktails;
