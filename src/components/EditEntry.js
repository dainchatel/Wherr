import React, { Component } from 'react';

class EditEntry extends Component {
  constructor() {
    super();
    this.renderNeighborhoodList = this.renderNeighborhoodList.bind(this);
    this.state = {
      neighbAdd: false
    }
  }

  //sends new destination object, gathered from all inputs, to the add list function in app

  confirmDestination(e) {
    e.preventDefault();
    const destination = {
      name: this.name.value,
      neighborhood: this.neighborhood.value,
      cross1: this.crossOne.value,
      cross2: this.crossTwo.value,
      desc: this.description.value,
    }
    this.props.addDestToList(destination);
    this.context.router.transitionTo('/neighborhoods');
  }

  //populates select input with list of current neighborhoods stored in firebase

  renderNeighborhoodList() {
    const { neighborhoods } = this.props;
    if (neighborhoods) {
      const neighbList = Object.keys(neighborhoods).map(key => { return neighborhoods[key].name})
      const alphaList = neighbList.sort();
      return (alphaList.map(key =>  <option value={key} key={key}>{key}</option>));
    }
  }

  //adds a state that renders the neighborhood add field if user doesn't find neighborhood
  //they want in the select box

  addNeighbFromSelect() {
    if ('Add Neighborhood' === this.neighborhood.value) {
      this.setState({neighbAdd: true})
    }
  }

  //this adds the neighborhood from the add field, it triggers the same function in app
  //as the neighborhood add field that is in the neighborhood component

  addAnotherNeighborhood(e) {
    e.preventDefault();
    const neighb = {
      name: this.neighb.value,
    }
    this.props.createAnotherNeighb(neighb);
    this.setState({neighbAdd: false})
  }

  render() {
    let neighbAdd;
    if (this.state.neighbAdd) {
      neighbAdd = <form
                    className='neighborhood-add'
                    onSubmit={(e) => {this.addAnotherNeighborhood(e)}}>
                    <input
                      ref={(input) => {
                        this.neighb = input;
                        }
                      }
                    >
                    </input>
                    <button>+</button>
                  </form>
    }
    return (
      <div className='edit-entry-all'>
        <p className='edit-head'>I love that place!</p>
        {neighbAdd}
        <form className='edit-entry-form' onSubmit={(e) => {this.confirmDestination(e)}}>
          <div className='edit-entry-entry'>
            <label>Name</label>
            <input
              defaultValue={this.props.currentDest}
              ref={(input) => {
                this.name = input;
                }
              }
            >
            </input>
          </div>
            <div className='edit-entry-entry' className='the-select-div'>
              <label className='select-label'>Neighborhood</label></div>
              <select
                onChange={() => {this.addNeighbFromSelect()}}
                defaultValue={this.props.currentNeighb}
                ref={(input) => {
                  this.neighborhood = input;
                  }
                }
              >
                {this.renderNeighborhoodList()}
                <option>Add Neighborhood</option>
              </select>
                <div className='edit-entry-entry'>
                  <label>East-West Street</label>
                  <input className='edit-entry-short'
                    ref={(input) => {
                      this.crossOne = input;
                      }
                  }>
                  </input>
                </div>
            <div className='edit-entry-entry'>
              <label>North-South Street</label>
              <input
                className='edit-entry-short'
                ref={(input) => {
                  this.crossTwo = input;
                  }
                }
              >
              </input>
            </div>
              <div className='edit-entry-entry'>
                <label>Description</label>
                <input
                  className='edit-entry-short'
                  ref={(input) => {
                    this.description = input;
                    }
                  }
                >
                </input>
              </div>
              <button className='edit-entry-button'>+</button>
        </form>
      </div>
    );
  }
}

EditEntry.contextTypes = {
  router: React.PropTypes.object
}

export default EditEntry;
