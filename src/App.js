import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Match, Miss } from 'react-router';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Neighborhoods from './components/Neighborhoods';
import Contact from './components/Contact';
import EditEntry from './components/EditEntry';
import Dest from './components/Dest';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentKey: '',
      currentNeighb: '',
    }
    this.addDestination = this.addDestination.bind(this);
    this.addDestToList = this.addDestToList.bind(this);
    this.createNeighb = this.createNeighb.bind(this);
    this.deleteNeighb = this.deleteNeighb.bind(this);
    this.editNeighb = this.editNeighb.bind(this);
    this.displayDest = this.displayDest.bind(this);
    this.deleteDest = this.deleteDest.bind(this);
    this.sendEdit = this.sendEdit.bind(this);
    this.setNeighbEdit = this.setNeighbEdit.bind(this);
  }

  componentDidMount() {
    this.getTheNeighbs();
  }

//this is the method that "syncs" the neighborhood object, which has all neighborhoods and dests with firebase

  getTheNeighbs() {
    axios.get('https://wego-df1c5.firebaseio.com/.json')
      .then((res) => {
        this.setState({neighborhoods: res.data})
    })
      .catch((error) => {
        console.log(error);
    });
  }


  addDestination(dest) {
    this.setState({currentDest: dest});
  }

  //this adds a destination to the list of destinations for a particular neighborhood -
  //to find the right neighborhood, it goes through all neighborhoods and pulls the key
  //of the one that has a name that matches the neighborhood name in the incoming dest object

  addDestToList(dest) {
    const { neighborhoods } = this.state;
    let neighbKey;
    Object.keys(neighborhoods).map(key => {
      if (neighborhoods[key].name === dest.neighborhood) {
        neighbKey = key;
      }});
    axios.post('https://wego-df1c5.firebaseio.com/'+neighbKey+'.json', {
      name: dest.name,
      neighborhood: dest.neighborhood,
      cross1: dest.cross1,
      cross2: dest.cross2,
      desc: dest.desc,
    })
      .then((res) => {
        this.getTheNeighbs();
      });
  }

  //pretty self explanatory neighborhood creation, delete, and update

  createNeighb(neighbName) {
    axios.post('https://wego-df1c5.firebaseio.com/.json', neighbName)
      .then((res) => {
        let neighbs = this.state.neighborhoods;
        let newNeighbId = res.data.name;
        neighbs[newNeighbId] = neighbName;
        this.setState({neighborhoods: neighbs})
      });
  }

  deleteNeighb(neighbKey) {
    axios.delete('https://wego-df1c5.firebaseio.com/'+neighbKey+'.json')
      .then((res) => {
        this.getTheNeighbs();
      });
  }

  editNeighb(neighbKey, newName) {
    axios.patch('https://wego-df1c5.firebaseio.com/'+neighbKey+'.json', {name: newName})
      .then((res) => {
        this.getTheNeighbs();
      });
  }

  //this is called from the neighb component, and sets the state here so the dest component
  //knows what to display

  displayDest(dest, key, neighb) {
    this.setState({currentDest: dest});
    this.setState({currentKey: key});
    this.setState({currentNeighb: neighb})
  }

  //deletes a destination

  deleteDest(key) {
    let thisNeighb = this.state.currentNeighb;
    axios.delete('https://wego-df1c5.firebaseio.com/'+thisNeighb+'/'+key+'.json')
      .then((res) => {
        this.getTheNeighbs();
      })
  }

  //updates a destination

  sendEdit(name, cross1, cross2, desc, key) {
    let thisNeighb = this.state.currentNeighb;
    axios.patch('https://wego-df1c5.firebaseio.com/'+thisNeighb+'/'+key+'.json', {name: name, cross1: cross1, cross2: cross2, desc: desc})
      .then((res) => {
        this.getTheNeighbs();
      })
  }

  //this is for if you try to add a destination from the neighborhood page -
  //by setting the state in app, you can preselect the neighborhood on the edit entry component

  setNeighbEdit(neighb) {
    this.setState({currentNeighb: neighb})
    this.setState({currentDest: ''})
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="main">
            <Match
              exactly pattern="/"
              component={() => <Home addDestination={this.addDestination} />}
            />
            <Match
            exactly pattern="/neighborhoods"
            component={() => <Neighborhoods setNeighbEdit={this.setNeighbEdit} displayDest={this.displayDest} editNeighb={this.editNeighb} deleteNeighb={this.deleteNeighb} createNeighb={this.createNeighb} neighborhoods={this.state.neighborhoods}/>}
            />
            <Match
            exactly pattern="/contact"
            component={Contact} />
            <Match
            exactly pattern="/editentry"
            component={() => <EditEntry createAnotherNeighb={this.createNeighb} currentNeighb={this.state.currentNeighb} addDestToList={this.addDestToList} currentDest={this.state.currentDest} neighborhoods={this.state.neighborhoods}/>}
            />
            <Match
            exactly pattern="/dest/:index"
            component={() =>
                <Dest sendEdit={this.sendEdit} deleteDest={this.deleteDest} theKey={this.state.currentKey} dest={this.state.currentDest}/>
              }
            />
            <Miss component={NotFound} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
