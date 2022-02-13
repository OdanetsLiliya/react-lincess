import React from 'react';

import './App.css';

import NavBar from '../src/components/navbar'
import Routing from './components/routing';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routing />
    </div>
  );
}

export default App;
