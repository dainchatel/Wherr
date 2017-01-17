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
    eraseDest(e) {
      e.preventDefault();
      this.props.deleteDest(this.props.theKey);
    }

    editDest() {
      this.setState({editing: true})
    }

    sendDestEdit(e) {
      e.preventDefault();
      this.props.sendEdit(this.nameInput.value, this.crossOneInput.value, this.crossTwoInput.value, this.props.theKey);
      this.context.router.transitionTo('/neighborhoods');
    }

    render() {
        if (this.props.dest && !this.state.editing) {
        return (
          <div className='dest-return'>
            <div onDoubleClick={this.editDest}>{this.props.dest.name}</div>
            <div>{this.props.dest.cross1} & {this.props.dest.cross2}</div>
            <div>{this.props.dest.desc}</div>
            <div>
            <Link
                  onClick={(e) => {this.eraseDest(e)}}
                  to='/neighborhoods'
                  activeOnlyWhenExact
                  activeClassName='active'
                  >
                  Delete</Link>
            </div>


          </div>
        );
    }
    else if (this.props.dest) {
      return (
        <div className='dest-edit'>
          <form onSubmit={(e) => {this.sendDestEdit(e)}}>
          <input
            defaultValue={this.props.dest.name}
            ref={(input) => { this.nameInput = input; }}
            onFocus={() => {
              this.nameInput.select();
              }}
            ></input>
          <div><input
          defaultValue={this.props.dest.cross1}
          ref={(input) => { this.crossOneInput = input; }}
          onFocus={() => {
            this.crossOneInput.select();
            }}
          ></input>&<input
          defaultValue={this.props.dest.cross2}
          ref={(input) => { this.crossTwoInput = input; }}
          onFocus={() => {
            this.crossTwoInput.select();
            }}
          ></input></div>
          <button type='submit'>+</button>
          </form>
        </div>
        );
    }
    else {
      return (
        <div>hi</div>
        );
    }
}
}

Dest.contextTypes = {
  router: React.PropTypes.object
}

export default Dest;
