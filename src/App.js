import React, { Component } from 'react';
import './App.css';
import Hierarchy from './Hierarchy.js'
import FolderPane from './FolderPane.js'
class App extends Component {
  render() {
    return (
      <div id="container">
        <Hierarchy />
        <FolderPane />
      </div>
    );
  }
}


export default App;
