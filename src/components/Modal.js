import React, { useEffect, useState } from 'react'
import { createPortal } from "react-dom";
import useGetCocktailsById from '../custom-hooks/useGetCocktailsById';
import Loader from './Loader';


const Modal = ({isOpen, setModal, cocktailData}) => {

  const [cocktail, setCocktail] = useState({})
  const {handleCocktailFromList ,loading, error} = useGetCocktailsById(cocktailData)

  
  const handleClick = () => {setModal(false);document.querySelector('html').classList.remove('overflow-y-hidden')}
  const handleCocktailById = async () => {setCocktail(await handleCocktailFromList(cocktailData))}

  useEffect(()=>{

    if(isOpen){handleCocktailById()}

  },[isOpen])

  return (
  isOpen?
  createPortal(

  <div className="flex overflow-y-auto md:overflow-x-hidden bg-black/50 fixed right-0 left-0 top-0 z-50 justify-center h-modal h-screen md:h-full md:inset-0">
    <div className="relative px-4 w-full max-w-2xl py-2">
        <div className="relative bg-white rounded-lg  shadow dark:bg-gray-700">
        {
          loading?<Loader></Loader>
          :(<><div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600 ">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              {cocktail.strDrink}
          </h3>
          <button onClick={handleClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
          </button>
      </div>
    <div className='overflow-y-auto overflow-x-hidden'>
      <div className="p-6 space-y-6 flex justify-center">
          <img width={500} src={cocktail.strDrinkThumb} alt={cocktailData.strDrink}></img>
      </div>
      <div className="flex justify-between overflow-y-auto items-start p-5 border-b border-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Ingredientes
          </h3>
      </div>
      <div className="p-6 space-y-6">
        <ul>
          {Object.entries(cocktail).filter(([key,value]) => key.includes("strIngredient")&&(value!==null)).map(([key,value]) => <li key={value}>{value}</li> )}
        </ul>
      </div>
      <div className="flex justify-between overflow-y-auto items-start p-5 border-b border-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
              Instrucciones
          </h3>
      </div>
      <div className="p-6 space-y-6 ">
          {cocktail.strInstructions}
      </div>
  </div></>)
        }  
      </div>
    </div>
  </div>,
  document.getElementById("modal")
  ):"")
}

export default Modal;