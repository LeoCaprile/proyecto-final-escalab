import React, {useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';


//styled div
const SignupContainer = styled.div`
height: calc(100vh - 10.76rem);`



const Signup = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading,setLoading] = useState();
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();
    if(passwordRef.current.value !== passwordConfirmRef.current.value)return setError('Las contraseñas no coinciden');
    try{
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
      
    }catch (error){
      console.log(error)
      setLoading(false)
      setError('Error al crear la cuenta');
    }
  }



  return (
    <SignupContainer className='grid place-content-center my-5 item-center w-full'>
      <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col  gap-5 rounded-lg shadow-lg p-5 md:p-10'>
      <h1 className='text-3xl font-bold text-center py-5'>Registrarse</h1>

      <div className='flex flex-col'>
      <h1 className='font-medium text-2xl'>Email</h1>
      <input className='rounded-lg p-2 border-slate-100 border-2 outline-green-200 h-10 w-full' ref={emailRef} type='email' required/>
      </div>

      <div className='flex flex-col'>
      <h1 className='font-medium text-2xl'>Password</h1>
      <input className='rounded-lg p-2 border-slate-100 border-2 outline-green-200 h-10 w-full' minLength='6' ref={passwordRef} type='password' required/>
      </div>

      <div className='flex flex-col'>
      <h1 className='font-medium text-2xl'>Password confirmation</h1>
      <input className='rounded-lg p-2 border-slate-100 border-2 outline-green-200 h-10 w-full' minLength='6' ref={passwordConfirmRef} type='password' required/>
      </div>

      <button type='submit' className='rounded-lg font-bold p-2 mt-5 bg-green-200 shadow-lg' disabled={loading}>Registrarse</button>

      {error && <p className='text-red-600'>{error}</p>}

      </form>
      <Link className='text-green-600 mt-5' to='/login'>¿Ya tienes cuenta? Inicia sesión aquí</Link>
    </SignupContainer>

    
  );
};

export default Signup;
