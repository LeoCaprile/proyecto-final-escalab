import React, { useEffect, useState } from 'react';
import {useAuth} from '../contexts/AuthContext'
import { firestore } from '../firebase/firebase.utils';
import { setDoc,doc,getDoc} from 'firebase/firestore';

import {ReactComponent as Star} from '../assets/star.svg'
import { useHistory } from 'react-router-dom';

const Cocktail = ({strDrinkThumb,strDrink,idDrink}) => {


  const [star, setStar] = useState(false); 
  const {currentUser} = useAuth();
  const history = useHistory();

  useEffect(()=>{
      handleFavoriteOnRender(idDrink);
  },[currentUser])


const getUserFavorites = async ()=>{
  if(currentUser != null){
    const userFavoritesRef =  doc(firestore, 'users', currentUser.uid);
    const userDoc = await getDoc(userFavoritesRef);
    if(userDoc.exists()){
      const { favorites } = userDoc.data();
      return favorites;
    }else {
      await setDoc(doc(firestore,'users',currentUser.uid),{
        favorites:[],
      }); 
    }
  }else{
    return [];
  }
  
}

const handleFavoriteOnRender = async (id) =>{
  
  const favorites = await getUserFavorites();
  if(favorites.find(favId => favId === id)){
    setStar(!star);
}
}
  
  
  const handleUserNotLoggedIn = () =>{
    history.push("/login")
  }


  const handleFavorite = async(id) =>{
   const favorites = await getUserFavorites();
   if(favorites.find(favId => favId === id)){
    setStar(!star)
    const newArr = favorites.filter((favId)=>favId !== id);
    await setDoc(doc(firestore,'users',currentUser.uid),{
      favorites:newArr,
    });
   }else{
    setStar(!star)
    favorites.push(id);
    await setDoc(doc(firestore,'users',currentUser.uid),{
      favorites:favorites,
    }); 
   }
   
  } 

  return (
  <div className='flex flex-col gap-5 items-center justify-center p-5 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300 ease-linear'>
      
      <img className='h-3/4 rounded-lg cursor-pointer' src={strDrinkThumb} alt='drink' loading='lazy'/>
      <div className='flex justify-around w-full'>
      <h1 className='font-bold text-2xl'>{strDrink}</h1>
      <Star className={`self-center cursor-pointer ${star?'fill-yellow-400':'fill-yellow-100'}`} onClick={()=>{currentUser?handleFavorite(idDrink):handleUserNotLoggedIn()}} />
  
  </div>

  </div>
  )
};



export default Cocktail;
