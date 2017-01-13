import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import Router from 'react-router/BrowserRouter'

class Home extends Component {

  createDestination(e) {
    e.preventDefault();
    const newDest = this.content.value;
    this.props.addDestination(newDest);

  }

  render() {
    return (


      <form onSubmit={(e) => {this.createDestination(e)}}>
        <input
          placeholder='Add a destination...'
          onKeyPress={this.enterDestination}
          ref={(input) => {
              this.content = input;
              }
          }
        ></input>
        <button type='submit'>H</button>
      </form>


    );
  }
}

export default Home;
