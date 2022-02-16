import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase/firebase.utils';
import { setDoc,doc,getDoc } from 'firebase/firestore';

import { ReactComponent as Star } from '../assets/star.svg'
import { useHistory } from 'react-router-dom';
import Modal from './Modal';


export const getUserFavorites = async (currentUser)=>{
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

const Cocktail = ({strDrinkThumb,strDrink,idDrink, ...otherData}) => {


  const [star, setStar] = useState(false); 
  const [modal, setModal] = useState(false);
  const {currentUser} = useAuth();
  const history = useHistory();

  const cocktailData = {
    idDrink:idDrink,
    strDrink:strDrink,
    strDrinkThumb:strDrinkThumb,
    ...otherData,
  }

  useEffect(()=>{
      handleFavoriteOnRender(cocktailData);
  },[currentUser])


const handleFavoriteOnRender = async (cocktailData) =>{
  
  const favorites = await getUserFavorites(currentUser);
  if(favorites.find(favId => favId.idDrink === cocktailData.idDrink)){
    setStar(!star);
}
}
  
  
  const handleUserNotLoggedIn = () =>{
    history.push("/login")
  }


  const handleFavorite = async(cocktailData) =>{
   const favorites = await getUserFavorites(currentUser);
   if(favorites.find(favId => favId.idDrink === cocktailData.idDrink)){
    setStar(!star)
    const newArr = favorites.filter((favId)=>favId.idDrink !== cocktailData.idDrink);
    await setDoc(doc(firestore,'users',currentUser.uid),{
      favorites:newArr,
    });
   }else{
    setStar(!star)
    favorites.push(cocktailData);
    await setDoc(doc(firestore,'users',currentUser.uid),{
      favorites:favorites,
    }); 
   }
  } 

  const handleClick = () =>{
    setModal(!modal)
    document.querySelector('html').classList.add('overflow-y-hidden')
  }

  return (
  <div className='flex flex-col gap-5 items-center justify-center p-5 shadow-lg rounded-3xl hover:scale-105 transition-transform duration-300 ease-linear'>
      
      <img onClick={handleClick} className='h-3/4 rounded-lg cursor-pointer' src={strDrinkThumb} alt='drink' loading='lazy'/>
      <div className='flex justify-around w-full'>
      <h1 className='font-bold text-2xl'>{strDrink}</h1>
      <Modal isOpen={modal} setModal={setModal} cocktailData={cocktailData}></Modal>
      <Star className={`self-center cursor-pointer ${star?'fill-yellow-400':'fill-yellow-100'}`} onClick={()=>{currentUser?handleFavorite(cocktailData):handleUserNotLoggedIn()}} />
  
  </div>

  </div>
  )
};



export default Cocktail;
