import React, { Component } from 'react';
import { Link } from 'react-router';

class Dest extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    }
    this.editDest = this.editDest.bind(this);
  }

  //erase a destination from the destination display page

  eraseDest(e) {
    e.preventDefault();
    this.props.deleteDest(this.props.theKey);
  }

  //set editing state so edit fields can display istead of current details, state
  //information is pulled into render function, maybe this was kind of lazy

  editDest() {
    this.setState({editing: true})
  }

  //send an edit up the chain to app edit send method

  sendDestEdit(e) {
    e.preventDefault();
    this.props.sendEdit(this.nameInput.value, this.crossOneInput.value, this.crossTwoInput.value, this.descInput.value, this.props.theKey);
    this.context.router.transitionTo('/neighborhoods');
  }

  render() {
    if (this.props.dest && !this.state.editing) {
      return (
        <div className='dest-return'>
          <div className='dest-unit' className='dest-name'>{this.props.dest.name}</div>
          <div className='dest-unit'>{this.props.dest.cross1} & {this.props.dest.cross2}</div>
          <div className='dest-unit' className='dest-desc'>"{this.props.dest.desc}"</div>
          <div className='dest-edit-buttons'>
            <div className='dest-edit-button'>
              <i onClick={this.editDest} className="icon-edit"></i>
            </div>
            <div className='dest-delete-button'>
              <Link
                onClick={(e) => {this.eraseDest(e)}}
                to='/neighborhoods'
                activeOnlyWhenExact
                activeClassName='active'
              >
                <i className="icon-trash"></i>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.dest) {
      return (
        <div className='dest-edit'>
          <form className='dest-edit-form' onSubmit={(e) => {this.sendDestEdit(e)}}>
            <input
              className='dest-edit-unit'
              className='dest-edit-name'
              defaultValue={this.props.dest.name}
              ref={(input) => { this.nameInput = input; }}
              onFocus={() => {
                this.nameInput.select();
                }
              }
            >
            </input>
          <div>
            <input
              className='dest-edit-street'
              defaultValue={this.props.dest.cross1}
              ref={(input) => { this.crossOneInput = input; }}
              onFocus={() => {
                this.crossOneInput.select();
                }
              }
            >
            </input>
            <div className='dest-edit-unit'>&</div>
            <input
              className='dest-edit-street-2'
              defaultValue={this.props.dest.cross2}
              ref={(input) => { this.crossTwoInput = input; }}
              onFocus={() => {
                this.crossTwoInput.select();
                }
              }
            >
            </input>
          </div>
          <input
            className='dest-edit-unit'
            className='dest-edit-desc'
            defaultValue={this.props.dest.desc}
            ref={(input) => { this.descInput = input; }}
            onFocus={() => {
              this.descInput.select();
              }
            }
          >
          </input>
            <div className='dest-edit-button-div' >
              <button className='dest-edit-button' type='submit'>+</button>
            </div>
        </form>
        </div>
      );
    }
    else {
      return (
        <div>Uh-oh Dain</div>
      );
    }
  }
}

Dest.contextTypes = {
  router: React.PropTypes.object
}

export default Dest;
