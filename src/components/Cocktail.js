import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { firestore } from '../firebase/firebase.utils';
import { setDoc,doc } from 'firebase/firestore';
import { ReactComponent as Star } from '../assets/star.svg'
import { useHistory } from 'react-router-dom';
import Modal from './Modal';
import useGetUserFavorites from '../custom-hooks/useGetUserFavorites';
import Error from './Error';
import useGetCocktailsById from '../custom-hooks/useGetCocktailsById';


const Cocktail = ({strDrinkThumb,strDrink,idDrink, ...otherData}) => {

  const cocktailData = {idDrink:idDrink, strDrink:strDrink, strDrinkThumb:strDrinkThumb, ...otherData}
  const [star, setStar] = useState(false); 
  const [modal, setModal] = useState(false);
  const {currentUser} = useAuth();
  const history = useHistory();
  const getFavorites = useGetUserFavorites();

  const handleFavoriteOnRender = async (cocktailData) =>{
    const favorites = await getFavorites();
    const isFavorite = await favorites.find(favId => favId.idDrink === cocktailData.idDrink)
    if(isFavorite)setStar(!star);
  }


  useEffect(()=>{
    if(currentUser!=null)handleFavoriteOnRender(cocktailData);
  },[currentUser])


  const handleUserNotLoggedIn = () =>{
    history.push("/login")
  }


  const handleFavorite = async(cocktailData) =>{
    const favorites = await getFavorites();
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
