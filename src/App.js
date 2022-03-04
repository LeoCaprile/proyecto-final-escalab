import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundry';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivaterRoute from './components/PrivaterRoute';
import AuthProvider from './contexts/AuthContext';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Ingredients from './pages/Ingredients';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';

function App() {

  return (
  <AuthProvider>
  <ErrorBoundary>

    <Header/>
    
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <PrivaterRoute path='/favorites' component={Favorites}/>
      <Route path='/categories' component={Categories}/>
      <Route path='/ingredients' component={Ingredients}/>
      <Route component={NotFound}></Route>
    </Switch>
    
    <Footer/>
    
  </ErrorBoundary>
  </AuthProvider>
   
  );

}

export default App;
