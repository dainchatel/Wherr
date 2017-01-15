import React, { Component } from 'react';

class Neighb extends Component {
    constructor() {
      super();
      this.renderDests = this.renderDests.bind(this);
      this.state = {
        displaying: false,
        selectedNeighb: {},
      }
    }

    renderDests() {
      const { neighborhoods } = this.props;
      let neighbKey;
      Object.keys(neighborhoods).map(key => {
        if (neighborhoods[key].name === this.props.details) {
          neighbKey = key;
      }});
      this.setState({selectedNeighb: this.props.neighborhoods[neighbKey]});
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
          displayed = this.state.selectedNeighb.name;
        }
        return (
          <div>
            <div onClick={this.renderDests}>{this.props.details}</div>
            <div>{displayed}</div>
          </div>
        );
    }
  }


export default Neighb;

