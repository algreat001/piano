import React from 'react';

import { Piano } from "./components/Piano";

import './App.css';
import { SocketContext, socket } from 'context/socket';

const App = () => {

  return <SocketContext.Provider value={socket}>
  <div className="App">
    <header className="App-header">
      <Piano />
    </header>
  </div>
  </SocketContext.Provider>
};

export default App;
