import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Neighborhoods from './components/Neighborhoods';
import Contact from './components/Contact';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentDest: '',
    }
    this.addDestination = this.addDestination.bind(this);
  }

  addDestination(dest) {
    this.setState({currentDest: dest});
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
            <Match exactly pattern="/editentry" component={EditEntry} />
            <Miss component={NotFound} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
