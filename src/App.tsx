import React from 'react';
import './App.scss';
import { useTavern } from './state/tavern';
import { LaunchPeer } from './components/launchPeer';

const App = () => {
  const { state } = useTavern();
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <h1>dnd-tavern</h1>
          <p>Are we connected?{state.connectionStatus}</p>
          <LaunchPeer />
        </div>
      </div>
    </div>
  );
};

export default App;
