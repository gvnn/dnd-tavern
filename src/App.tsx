import React from 'react';
import './App.scss';
import { PeerConnector } from './components/peerConnector';
import { ConnectionStatus } from './components/connectionStatus';
import { ConnectionsList } from './components/connectionsList';
import { DiceRoller } from './components/diceRoller';

const App = () => (
  <div className="container">
    <ConnectionStatus />
    <div className="columns">
      <div className="column col-12">
        <div className="hero hero-sm bg-gray">
          <div className="hero-body">
            <h1>#dnd-tavern</h1>
          </div>
        </div>
        <div className="columns">
          <div className="column col-6 col-lg-8 col-md-8 col-sm-12 mt-2">
            <PeerConnector />
            <ConnectionsList />
          </div>
          <div className="column col-6 col-lg-4 col-md-4 col-sm-12 mt-2">
            <DiceRoller />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
