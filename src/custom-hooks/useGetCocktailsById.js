import axios from "axios";
import { useState } from "react";
import { getCocktailById } from "../constants";

function useGetCocktailsById(cocktailData) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const getCocktail = async (id) =>{
    try{
     const {data} = await axios.get(getCocktailById(id))
     const cocktailInfo = await data.drinks;
     setError(false)
     return cocktailInfo[0]
    }
    catch(error){
      setError(true)
    }
 }

 const handleCocktailFromList = async (cocktailData) =>{ 

  if(Object.keys(cocktailData).length === 3){

    const cocktail = await getCocktail(cocktailData.idDrink);
    setLoading(false)
    return cocktail

  }else{

    setLoading(false)
    return cocktailData

  }
}



 return {handleCocktailFromList, loading, error}
}

export default useGetCocktailsById;