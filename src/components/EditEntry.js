import React, { Component } from 'react';

class EditEntry extends Component {

    confirmDestination(e) {
      e.preventDefault();
      const destination = {
        name: this.name.value,
        neighborhood: this.neighborhood.value,
        cross1: this.crossOne.value,
        cross2: this.crossTwo.value
      }
      this.props.addDestToList(destination);
      this.context.router.transitionTo('/neighborhoods');
    }

    renderNeighborhoodList() {
      const { neighborhoods } = this.props;
      if (neighborhoods) {
        const neighbList = Object.keys(neighborhoods).map(key => { return neighborhoods[key].name})
        const alphaList = neighbList.sort();
        return (alphaList.map(key => <option key={key}>{key}</option>));
      }
  }

    render() {
        return (
            <div className='edit-entry-all'>
            <p className='edit-head'>I love that place!</p>
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
                  ref={(input) => {
                    this.neighborhood = input;
                    }
                  }>
                  {this.renderNeighborhoodList()}
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
