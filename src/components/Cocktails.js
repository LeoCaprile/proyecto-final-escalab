import React from 'react';
import Cocktail from './Cocktail';
import Loader from './Loader';
import useGetCocktails from '../custom-hooks/useGetCocktails';
import Error from './Error';
import Empty from './Empty';

const Cocktails = ({type, category}) => {

  const {cocktails, error, loading, isEmpty} = useGetCocktails(type, category)

  
  if(loading) {return <Loader></Loader>}
  
  if(error) {return <Error></Error>}

  if(isEmpty) {return <Empty></Empty>}

  return (
  cocktails.map(({idDrink, ...cocktail})=>{
  return <Cocktail key={idDrink} idDrink={idDrink} {...cocktail}></Cocktail>
  })
  );
};

export default Cocktails;
