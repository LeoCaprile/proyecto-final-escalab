import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cocktail from './Cocktail';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';
import { getUserFavorites } from './Cocktail';
import { getPopularCocktails, getLatestCocktails, getCocktailsByCategories } from '../constants';

const Cocktails = ({type, category}) => {

  const [cocktails, setCocktails] = useState([]);
  const { currentUser } = useAuth()

  useEffect(()=>{
    renderCocktailsByType(type, category);
  },[category])

  const renderCocktailsByType = (type, category) =>{
    switch(type){
      case 'popular':
        getCocktails({cocktailApiUrl:getPopularCocktails(),limit:true});
      break;

      case 'latest':
        getCocktails({cocktailApiUrl:getLatestCocktails(),limit:true});
      break;

      case 'favorites':
        getFavorites();
      break;

      case 'categories':
        getCocktails({cocktailApiUrl:getCocktailsByCategories(category),limit:false})
      break;

      default:
        alert("Hubo un error en la definicion de los datos");
      break;
    }
  }


  const getCocktails = async ({cocktailApiUrl, limit}) =>{
      const {data} = await axios.get(cocktailApiUrl)
      const cocktailsData = await data.drinks;
      if(limit){cocktailsData.length = 8;}
      setCocktails(cocktailsData)
  }

  const getFavorites = async () =>{
    setCocktails(await getUserFavorites(currentUser));
  }

  if(cocktails.length<=0){
    return <Loader></Loader>
  }

  return (cocktails.map(({idDrink, ...cocktail})=>{
    return <Cocktail key={idDrink} idDrink={idDrink} {...cocktail}></Cocktail>
  }));
};

export default Cocktails;
