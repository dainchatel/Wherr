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
                    <option>Chelsea</option>
                    <option>East Village</option>
                    <option>Tribeca</option>
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
