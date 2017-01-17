import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.createDestination = this.createDestination.bind(this);
  }

  createDestination(e) {
    e.preventDefault();
    const newDest = this.content.value;
    this.props.addDestination(newDest);
    this.context.router.transitionTo('/editentry');
  }

  render() {
    return (
      <div>
        <div className='head-wrap'>
          <h1>Here</h1>
          <h2>what's good around here?</h2>
        </div>
        <form className='home-form' onSubmit={(e) => {this.createDestination(e)}}>
          <input

            onKeyPress={this.enterDestination}
            ref={(input) => {
                this.content = input;
                }
            }
          ></input>
          <button type='submit'>+</button>
        </form>
      </div>


    );
  }


}

Home.contextTypes = {
  router: React.PropTypes.object
}


export default Home;
