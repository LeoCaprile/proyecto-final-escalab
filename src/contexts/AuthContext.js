import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState, useContext, useEffect } from 'react';
import { auth} from '../firebase/firebase.utils';


const AuthContext = React.createContext(); 

//Custom hook
export function useAuth(){
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState();

  function logout(){
    signOut(auth).then(()=>{
      console.log('sesion cerrada')
    });
  }

 function signup(email, password){
  return createUserWithEmailAndPassword(auth,email,password);
  }

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password);
  }

  useEffect(()=>{

    auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
  })


  const value = {
    currentUser,
    signup,
    login,
    logout
  }

  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>);
};


export default AuthProvider;
