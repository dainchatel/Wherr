import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import Router from 'react-router/BrowserRouter';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Neighborhoods from './components/Neighborhoods';
import Contact from './components/Contact';

class App extends Component {

  addDestination(dest) {
    console.log(dest);
    Router.redirect('/neighborhoods');
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="main">
            <Match exactly pattern="/" component={() => <Home addDestination={this.addDestination}/>}
            />
            <Match exactly pattern="/neighborhoods" component={Neighborhoods} />
            <Match exactly pattern="/contact" component={Contact} />
            <Miss component={NotFound} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
