import React, {Suspense, lazy} from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundry';
import PrivaterRoute from './components/PrivaterRoute';
import AuthProvider from './contexts/AuthContext';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';

import Home from './pages/Home';
//Lazy Loading
const Favorites = lazy(() => import('./pages/Favorites'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const Ingredients = lazy(() => import('./pages/Ingredients'));
const Categories = lazy(()=>import('./pages/Categories'))


function App() {

  return (
  <AuthProvider>
  <ErrorBoundary>

  <Header/>

    <Suspense
      fallback={<Loader/>}>

    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <PrivaterRoute exact path='/favorites' component={Favorites}/>
        <Route exact path='/categories' component={Categories}/>
        <Route exact path='/ingredients' component={Ingredients}/>
        <Route path='*' exact={true} component={NotFound}></Route>
    </Switch>
    </Suspense>

  <Footer/>
    
  </ErrorBoundary>
  </AuthProvider>
   
  );

}

export default App;
