import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cocktail from './Cocktail';
import { useAuth } from '../contexts/AuthContext';
import Loader from './Loader';

const Cocktails = ({cocktailApiUrl, getUserFavorites} ) => {

  const [cocktails, setCocktails] = useState([]);
  const { currentUser } = useAuth()

  useEffect(()=>{
    getCocktails()
  },[])

  const getCocktails = async () =>{
    if(cocktailApiUrl){
      const {data} = await axios.get(cocktailApiUrl)
      const cocktailsData = await data.drinks;
      cocktailsData.length = 8;
      setCocktails(cocktailsData)
    }else if(getUserFavorites){
      setCocktails(await getUserFavorites(currentUser));
    }
  }

  if(cocktails.length<=0){
    return <Loader></Loader>
  }

  return (cocktails.map(({idDrink, ...cocktail})=>{
    return <Cocktail key={idDrink} idDrink={idDrink} {...cocktail}></Cocktail>
  }));
};

export default Cocktails;
