import React, { useState } from 'react';
import Peer from 'peerjs';
import { useTavern } from '../state/tavern';

export const LaunchPeer = () => {
  const { state, dispatch } = useTavern();

  const [connectButtonState, setConnectButtonState] = useState('Connect');
  const [disconnectButtonState, setDisconnectButtonState] = useState(
    'Disconnect',
  );

  const [remoteBrokerId, setRemoteBrokerId] = useState<string>('');

  const connectAsHost = (
    peer: Peer,
    { brokerId, remoteBrokerId }: { brokerId: string; remoteBrokerId: string },
  ) => {
    dispatch({ type: 'CONNECTED', brokerId, remoteBrokerId });
    setConnectButtonState('Connected');
    peer.on('connection', (connection) => {
      connection.on('data', console.log);
    });
  };

  const connectAsClient = (
    peer: Peer,
    { brokerId, remoteBrokerId }: { brokerId: string; remoteBrokerId: string },
  ) => {
    const newConnection = peer.connect(remoteBrokerId);
    newConnection.on('open', function () {
      dispatch({ type: 'CONNECTED', brokerId, remoteBrokerId });
      setConnectButtonState('Connected');
      // here you have conn.id
      newConnection.send('hi!');
    });
    newConnection.on('data', console.log);
  };

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

    peer.on('open', (Id) => {
      if (remoteBrokerId !== '' && remoteBrokerId !== Id) {
        connectAsClient(peer, { brokerId: Id, remoteBrokerId });
      } else {
        connectAsHost(peer, { brokerId: Id, remoteBrokerId: Id });
      }
    });

    dispatch({ type: 'SET_PEER', peerInstance: peer });
  };

  const disconnect = () => {
    setDisconnectButtonState('Disconnecting...');
    dispatch({ type: 'DISCONNECT' });
    state.peerInstance?.destroy();
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRemoteBrokerId(event.currentTarget.value);
  };

  const renderConnect = () => (
    <>
      <div className="form-group">
        <input
          className="form-input"
          type="text"
          placeholder="Broker ID"
          autoComplete="off"
          spellCheck="false"
          value={remoteBrokerId}
          onChange={onChange}
        ></input>
        <p className="form-input-hint">
          If you want to connect to an existing peer ask your friends for a{' '}
          <em>Broker ID</em>. If you starting a new peer just press the{' '}
          <em>Connect</em> button.
        </p>
      </div>
      <button className="btn" onClick={connect}>
        {connectButtonState}
      </button>
    </>
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
