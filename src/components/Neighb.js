import React, { Component } from 'react';
import { Link } from 'react-router';

class Neighb extends Component {
    constructor() {
      super();

      this.renderDests = this.renderDests.bind(this);
      this.editNeighb = this.editNeighb.bind(this);
      this.renderNeighbedit = this.renderNeighbEdit.bind(this);
      this.chooseNeighbForDelete = this.chooseNeighbForDelete.bind(this);
      this.chooseNeighbForEdit = this.chooseNeighbForEdit.bind(this);
      this.selectDest = this.selectDest.bind(this);


      this.state = {
        displaying: false,
        selectedNeighb: {},
        key: '',
        editing: false,
        index: '',
        buttonDisplay: false
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

    selectDest(dest, key, neighb) {
      this.props.displayDest(dest, key, neighb);
    }

    retrieveDests() {
      let thisNeighb = this.state.selectedNeighb;
      return (


      Object.keys(thisNeighb).map(key => {
        if (thisNeighb[key] !== this.state.selectedNeighb.name) {
          return(
            <div key={key}>
            <Link

            to={`/dest/${thisNeighb[key].name}`}
            onClick={(e) => {this.selectDest(thisNeighb[key], key, this.state.key)}}
            activeOnlyWhenExact

            key={key}
            className='neighb-dests'
            >{thisNeighb[key].name}</Link></div>
            );
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

  // addDestFromNeighb() {

  //     this.setState({buttonDisplay: true})

  // }

  // takeAwayButton() {
  //   setTimeout(() => { this.setState({buttonDisplay: false}); }, 2500);
  // }

  // taketoAddEntry(e) {
  //   e.preventDefault();
  //   // this.context.router.transitionTo('/editentry');
  //   console.log('hi')

  // }



  renderNeighborhood() {
    return (
      <div>

      <div>
    <div className="whole-thing"
    onClick={this.renderDests}
    onDoubleClick={this.editNeighb}

    >{this.props.details}</div>

    </div>
    </div>
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
        this.setState({displaying: false})

    return (
      <div className='neighb-edit-forms'>
        <form onSubmit={(e) => {this.chooseNeighbForEdit(e)}}>
          <input

            ref={(input) =>  { this.textInput = input; } }
            onFocus={() => {
            this.textInput.select();
            }}
            // autoFocus
            defaultValue={neighb}
          >
          </input>
          <button className='neighb-edit-button' type='submit'>+</button>
        </form>
        <form>
        <button className='delete-neighb-butt' onClick={this.chooseNeighbForDelete}><i className="icon-trash"></i></button>
        </form>
      </div>
      );
  }

  setNeighbEdit(e) {
    this.props.setNeighbEdit(this.state.selectedNeighb.name);
    this.context.router.transitionTo('/editentry');


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
        let addButton;
        if (this.state.displaying) {
          addButton = <button className='add-from-neighb'
                  onClick={(e) => {this.setNeighbEdit(e)}}


                >+</button>
        }
        return (
          <div>
            <div className='neighb-with-button'>
            {neighborhood}
            {addButton}
            </div>
            <div className='the-dests'>
            {displayed}
            </div>
          </div>
        );
    }
  }

  Neighb.contextTypes = {
  router: React.PropTypes.object
}


export default Neighb;

