import React from 'react';
import './App.scss';
import { LaunchPeer } from './components/launchPeer';
import { ConnectionStatus } from './components/connectionStatus';

const App = () => (
  <div className="container">
    <ConnectionStatus />
    <div className="columns">
      <div className="column">
        <h1>dnd-tavern</h1>
        <LaunchPeer />
      </div>
    </div>
  </div>
);

export default App;
