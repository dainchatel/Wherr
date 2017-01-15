import React, { Component } from 'react';

class Neighb extends Component {
    constructor() {
      super();
      this.renderDests = this.renderDests.bind(this);
      this.state = {
        displaying: false,
        selectedNeighb: {},
        key: ''
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

    render() {
        let displayed;
        if (this.state.displaying) {
          displayed = this.retrieveDests();
        }
        return (
          <div>
            <div onClick={this.renderDests}>{this.props.details}</div>
            {displayed}
          </div>
        );
    }
  }


export default Neighb;

