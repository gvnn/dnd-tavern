import React, { useState } from 'react';
import Peer from 'peerjs';
import { useTavern } from '../state/tavern';

export const LaunchPeer = () => {
  const { dispatch } = useTavern();
  const [connectButtonState, setConnectButtonState] = useState('Connect');

  const connect = () => {
    dispatch({ type: 'CONNECT' });
    setConnectButtonState('Connecting...');
    new Peer({
      key: 'beer',
      host: 'dnd-tavern-server.herokuapp.com',
      secure: true,
    }).on('open', (brokerId) => {
      dispatch({ type: 'CONNECTED', brokerId });
      setConnectButtonState('Connected');
    });
  };

  return (
    <button className="btn" onClick={connect}>
      {connectButtonState}
    </button>
  );
};
