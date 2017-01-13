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
    this.context.router.transitionTo('/contact');
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

Home.contextTypes = {
  router: React.PropTypes.object
}


export default Home;
