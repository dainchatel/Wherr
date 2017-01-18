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

  //have to populate the neighborhoods when the component mounts or it will happen too slowly
  //not sure why i don't have to do that in edit entry component
  //chekcing to see if the neighborhood is the one that was clicked on, if so
  //setting the state so this component knows which destinations to display

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

  //pick a destination to display full details of, has to go with neighborhood info so
  //app can find it

  selectDest(dest, key, neighb) {
    this.props.displayDest(dest, key, neighb);
  }

  //retrieves and displays the destinations (as links to their details pages) if that neighborhood is selected

  retrieveDests() {
    let thisNeighb = this.state.selectedNeighb;
    return (
      Object.keys(thisNeighb).map(key => {
        if (thisNeighb[key] !== this.state.selectedNeighb.name) {
          return(
            <div className='neighb-dests-div' key={key}>
              <Link
                to={`/dest/${thisNeighb[key].name}`}
                onClick={(e) => {this.selectDest(thisNeighb[key], key, this.state.key)}}
                activeOnlyWhenExact
                key={key}
                className='neighb-dests'
              >
              {thisNeighb[key].name}
              </Link>
            </div>
            );
        }
      })
    );
  }

  //changes states so conditions in render method will be met/the right destinations will display

  renderDests() {
    if (this.state.displaying === true) {
      this.setState({displaying: false})
    }
    else {
      this.setState({displaying: true})
    }
  }

  //pretty self explanatory

  editNeighb() {
    this.setState({editing: true});
    this.setState({displaying: false})
  }

  //not using this anymore but I want to keep it because I like it, was the thing
  //I figured out with Ariana

  // takeAwayButton() {
  //   setTimeout(() => { this.setState({buttonDisplay: false}); }, 2500);
  // }

  //the method that is called in render to return the destinations of a particular neighborhood
  //i don't know why there are so many divs but i have been fighting with this styling for hours
  //so I am NOT CHANGING ANYTHING

  renderNeighborhood() {
    return (
      <div>
        <div>
          <div
            className="whole-thing"
            onClick={this.renderDests}
          >
            {this.props.details}
          </div>
        </div>
      </div>
    );
  }

  //edit and delete neighborhoods, RIGHT FROM THE PAGE!

  chooseNeighbForDelete() {
    this.props.deleteNeighb(this.state.key);
  }

  chooseNeighbForEdit(e) {
    this.props.editNeighb(this.state.key, this.textInput.value);
    e.preventDefault();
  }

  //if editing state is true, this is the render function that runs

  renderNeighbEdit(neighb) {
    return (
      <div className='neighb-edit-forms'>
        <form onSubmit={(e) => {this.chooseNeighbForEdit(e)}}>
          <input

            ref={(input) =>  { this.textInput = input; } }
            onFocus={() => {
            this.textInput.select();
            }}
            // autoFocus never worked with the select function :(
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

  //this should be "send neighb edit" but I think I already had a method called that
  //just sends you to the edit page with the neighborhood pre-populated, in case you want to
  //add a dest while looking at the neighborhood page

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
        addButton = <div className='neighb-add-and-edit'>
                      <button
                        className='add-from-neighb'
                        onClick={(e) => {this.setNeighbEdit(e)}}
                      >+
                      </button>
                      <i onClick={this.editNeighb} className="icon-edit"></i>
                    </div>
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

