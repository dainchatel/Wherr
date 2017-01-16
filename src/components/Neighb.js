import React, { Component } from 'react';

class Neighb extends Component {
    constructor() {
      super();
      this.renderDests = this.renderDests.bind(this);
      this.editNeighb = this.editNeighb.bind(this);
      this.renderNeighbedit = this.renderNeighbEdit.bind(this);
      this.chooseNeighbForDelete = this.chooseNeighbForDelete.bind(this);
      this.chooseNeighbForEdit = this.chooseNeighbForEdit.bind(this);
      this.state = {
        displaying: false,
        selectedNeighb: {},
        key: '',
        editing: false,
      }
    }

    componentDidMount() {
      const { neighborhoods } = this.props;
      let neighbKey;
      Object.keys(neighborhoods).map(key => {
        if (neighborhoods[key].name === this.props.details) {
          neighbKey = key;
      }});
      this.setState({selectedNeighb: this.props.neighborhoods[neighbKey]});
      this.setState({key: neighbKey});
    }

    retrieveDests() {
      let thisNeighb = this.state.selectedNeighb;
      return (
      Object.keys(thisNeighb).map(key => {
        if (thisNeighb[key] !== this.state.selectedNeighb.name) {
          return( <div key={key} className='neighb-dests'>{thisNeighb[key].name}</div>);
        }
      })
    );
    }

    renderDests() {

      if (this.state.displaying === true) {
        this.setState({displaying: false})
      }
      else {
      this.setState({displaying: true})
    }
  }

  editNeighb() {
    this.setState({editing: true});
  }

  renderNeighborhood() {
    return (
    <div onClick={this.renderDests} onDoubleClick={this.editNeighb} >{this.props.details}</div>
    );
  }

  chooseNeighbForDelete() {
    this.props.deleteNeighb(this.state.key);
  }

  chooseNeighbForEdit(e) {
    this.props.editNeighb(this.state.key, this.textInput.value);
    e.preventDefault();
  }

  renderNeighbEdit(neighb) {
    return (
      <div>
        <form onSubmit={(e) => {this.chooseNeighbForEdit(e)}}>
          <input
            defaultValue={neighb}
            ref={(input) => { this.textInput = input; }}
            onFocus={() => {
            this.textInput.select();
            }}
          >
          </input>
          <button type='submit'>+</button>
        </form>
        <button onClick={this.chooseNeighbForDelete}>x</button>
      </div>
      );
  }

    render() {
        let neighborhood;
        if (this.state.editing) {
          neighborhood = this.renderNeighbEdit(this.state.selectedNeighb.name);
        }
        else {
          neighborhood = this.renderNeighborhood();
        }
        let displayed;
        if (this.state.displaying) {
          displayed = this.retrieveDests();
        }
        return (
          <div>
            {neighborhood}
            {displayed}

          </div>
        );
    }
  }


export default Neighb;

