import React, { Component } from 'react';

class EditEntry extends Component {
    constructor() {
      super();
      this.renderNeighborhoodList = this.renderNeighborhoodList.bind(this);
      this.state = {
        neighbAdd: false
      }
    }
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

    renderNeighborhoodList() {
      const { neighborhoods } = this.props;
      if (neighborhoods) {
        const neighbList = Object.keys(neighborhoods).map(key => { return neighborhoods[key].name})
        const alphaList = neighbList.sort();

        return (alphaList.map(key =>  <option

          value={key} key={key}>{key}</option>));
      }
  }

  addNeighbFromSelect() {
    if ('Add Neighborhood' === this.neighborhood.value) {
      this.setState({neighbAdd: true})
    }
  }

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
        neighbAdd = <form className='neighborhood-add' onSubmit={(e) => {this.addAnotherNeighborhood(e)}}>
            <input
              ref={(input) => {
                this.neighb = input;
                }
            }></input>
            <button>+ Neighborhood</button>
          </form>
      }
        return (
            <div className='edit-entry-all'>
            <p className='edit-head'>I love that place!</p>
              {neighbAdd}
              <form className='edit-entry-form' onSubmit={(e) => {this.confirmDestination(e)}}>
                <div>
                  <label>Name</label>
                  <input
                  defaultValue={this.props.currentDest}
                  ref={(input) => {
                    this.name = input;
                    }
                  }>
                  </input>
                </div>
                <div>
                  <label>Neighborhood</label>
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

                </div>
                <div>
                  <label>Cross Street A</label>
                  <input
                    ref={(input) => {
                      this.crossOne = input;
                      }
                  }>
                  </input>
                </div>
                <div>
                  <label>Cross Street B</label>
                  <input
                    ref={(input) => {
                      this.crossTwo = input;
                      }
                  }>
                  </input>
                </div>
                <div>
                  <label>Description</label>
                  <input
                    ref={(input) => {
                      this.description = input;
                    }}>
                  </input>
                </div>
                <button>Save</button>
                </form>

            </div>
        );
    }
}

EditEntry.contextTypes = {
  router: React.PropTypes.object
}

export default EditEntry;
