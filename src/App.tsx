import React from 'react';
import './App.scss';
import { LaunchPeer } from './components/launchPeer';
import { ConnectionStatus } from './components/connectionStatus';

const App = () => (
  <div className="container">
    <ConnectionStatus />
    <div className="columns">
      <div className="column col-12">
        <h1>dnd-tavern</h1>
        <div className="columns">
          <div className="column col-6 col-lg-9 col-md-9 col-sm-12">
            <LaunchPeer />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
