import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import AuthProvider from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
    <Fragment>
    <AuthProvider>
    <Header></Header>
    <Navbar></Navbar>
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
    </Switch>
    <Footer></Footer>
    </AuthProvider>
    </Fragment>
  );

}

export default App;
