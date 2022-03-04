import { useEffect, useState } from 'react';
import { getPopularCocktails, getLatestCocktails, getCocktailsByCategories, getCocktailsByIngredients } from '../constants';
import axios from 'axios';
import useGetUserFavorites from './useGetUserFavorites';


const useGetCocktails = (type, category) => {
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const getUserFavorites = useGetUserFavorites()
  
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

      case 'ingredients':
        getCocktails({cocktailApiUrl:getCocktailsByIngredients(category),limit:false})
      break;

      default:
        alert("Hubo un error en la definicion de los datos");
      break;
    }
  }

  const getCocktails = async ({cocktailApiUrl, limit}) =>{
     try{
      const {data} = await axios.get(cocktailApiUrl)
      const cocktailsData = await data.drinks;
      if(limit){cocktailsData.length = 8;}
      setCocktails(cocktailsData)
      setLoading(false)
      setError(false)
     }
     catch(error){
      setLoading(false)
      setError(true)
     }
  }

  const getFavorites = async () =>{
    try{
      const favorites = await getUserFavorites()
     if(favorites.length>0){
      setCocktails(favorites);
      setLoading(false)
    } else{
      setIsEmpty(true)
      setLoading(false)
    }
    }
    catch(error){
      setError(true);
      setLoading(false)
    }
    
  }

  return {cocktails, error, loading, isEmpty}
}

export default useGetCocktails;