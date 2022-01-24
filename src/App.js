import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {

  return (
    <Fragment>
    <Header></Header>
    <Navbar></Navbar>
    <Switch>
      <Route exact path='/' component={Home}></Route>
    </Switch>
    <Footer></Footer>
    </Fragment>
  );

}

export default App;
