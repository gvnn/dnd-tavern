import React from 'react';
import './App.scss';
import { PeerConnector } from './components/peerConnector';
import { ConnectionStatus } from './components/connectionStatus';
import { ConnectionsList } from './components/connectionsList';

const App = () => (
  <div className="container">
    <ConnectionStatus />
    <div className="columns">
      <div className="column col-12">
        <h1>dnd-tavern</h1>
        <div className="columns">
          <div className="column col-6 col-lg-9 col-md-9 col-sm-12">
            <PeerConnector />
          </div>
        </div>
        <ConnectionsList />
      </div>
    </div>
  </div>
);

export default App;
