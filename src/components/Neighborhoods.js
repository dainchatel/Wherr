import React, { Component } from 'react';
import Neighb from './Neighb';

class Neighborhoods extends Component {

  //add neighbhorhood event handler, triggers app's create neighborhood function with
  //new input as argument

  addNeighborhood(e) {
    e.preventDefault();
    const neighb = {
      name: this.neighb.value,
    }
    this.props.createNeighb(neighb);
    this.neighb.value = '';
  }

  //loops through and displays the neighborhoods in alphabetical order as neighb components

  renderNeighborhoods() {
    const { neighborhoods } = this.props;
    if (neighborhoods) {
      const neighbList = Object.keys(neighborhoods).map(key => { return neighborhoods[key].name})
      const alphaList = neighbList.sort();
      return (alphaList.map(key =>
            <Neighb
              className='neighb-from-list'
              key={key}
              details={key}
              neighborhoods={this.props.neighborhoods}
              deleteNeighb={this.props.deleteNeighb}
              editNeighb={this.props.editNeighb}
              displayDest={this.props.displayDest}
              setNeighbEdit={this.props.setNeighbEdit}
            />
      ));
    }
  }

  render() {
    return (
      <div>
        <div className='main-neighbs'>
          {this.renderNeighborhoods()}
        </div>
        <form
          className='neighborhood-add'
          onSubmit={(e) => {this.addNeighborhood(e)}}
        >
          <input
            ref={(input) => {
              this.neighb = input;
              }
            }
            >
          </input>
          <button>+</button>
        </form>
      </div>
    );
  }
}



export default Neighborhoods;
