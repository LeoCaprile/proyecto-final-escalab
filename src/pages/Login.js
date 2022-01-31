import React, {useRef, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

//styled div
const LoginContainer = styled.div`
height: calc(100vh - 10.76rem);`

const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading,setLoading] = useState();
  const { login } = useAuth();
  const history = useHistory();

  const handlesubmit = async (e) =>{ 
    try{
      e.preventDefault();
      setError('');
      setLoading(true)
      await login(emailRef.current.value,passwordRef.current.value);
      history.push("/");

    }catch(error){
      setError('El email y/o contraseña no existen')
      console.log(error)
      setLoading(false)
    }

  }

  return (
    <LoginContainer className='grid place-content-center my-5 item-center w-full'>
      <form onSubmit={handlesubmit} className='flex flex-col  gap-5 rounded-lg shadow-lg p-5 md:p-10'>
      <h1 className='text-3xl font-bold text-center py-5'>Iniciar Sesion</h1>

      <div className='flex flex-col'>
      <h1 className='font-medium text-2xl'>Email</h1>
      <input className='rounded-lg p-2 border-slate-100 border-2 outline-green-200 h-10 w-full' ref={emailRef} type='email' />
      </div>

      <div className='flex flex-col'>
      <h1 className='font-medium text-2xl'>Password</h1>
      <input className='rounded-lg p-2 border-slate-100 border-2 outline-green-200 h-10 w-full' ref={passwordRef} type='password' />
      </div>


      <button className='rounded-lg font-bold p-2 mt-5 bg-green-200 shadow-lg' disabled={loading}>Iniciar sesion</button>
      {error && <p className='text-red-600'>{error}</p>}
      </form>
      <Link className='text-green-600 mt-5' to='/signup'>¿No tienes cuenta? Registrate aquí</Link>
    </LoginContainer>

    
  );
};

export default Login;
