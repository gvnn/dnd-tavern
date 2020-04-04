import React, { useState } from 'react';
import Peer from 'peerjs';
import { useTavern } from '../state/tavern';

export const LaunchPeer = () => {
  const { state, dispatch } = useTavern();

  const [connectButtonState, setConnectButtonState] = useState('Connect');
  const [disconnectButtonState, setDisconnectButtonState] = useState(
    'Disconnect',
  );

  const connect = () => {
    dispatch({ type: 'CONNECT' });
    setConnectButtonState('Connecting...');

    const peer = new Peer({
      key: 'beer',
      host: 'dnd-tavern-server.herokuapp.com',
      secure: true,
    });

    peer.on('disconnected', () => {
      dispatch({ type: 'DISCONNECTED' });
      setConnectButtonState('Connect');
      setDisconnectButtonState('Disconnect');
    });

    peer.on('open', (brokerId) => {
      dispatch({ type: 'CONNECTED', brokerId });
      setConnectButtonState('Connected');
    });

    dispatch({ type: 'SET_PEER', peerInstance: peer });
  };

  const disconnect = () => {
    setDisconnectButtonState('Disconnecting...');
    dispatch({ type: 'DISCONNECT' });
    state.peerInstance?.destroy();
  };

  const renderConnect = () => (
    <button className="btn" onClick={connect}>
      {connectButtonState}
    </button>
  );

  const renderDisconnect = () => (
    <button className="btn" onClick={disconnect}>
      {disconnectButtonState}
    </button>
  );

  return state.connectionStatus === 'CONNECTED'
    ? renderDisconnect()
    : renderConnect();
};
