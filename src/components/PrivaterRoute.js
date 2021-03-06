import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivaterRoute({component: Component, ...rest}) {

  const {currentUser} = useAuth();

  return (
        <Route {...rest} render={props =>{return currentUser?<Component></Component>:<Redirect to='/login'></Redirect>}}/>
    );
}
