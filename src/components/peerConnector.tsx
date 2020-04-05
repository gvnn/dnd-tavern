import React, { useState } from 'react';
import { useTavern } from '../state/tavern';
import { connect } from '../utils/peer';

export const PeerConnector = () => {
  const { state, dispatch } = useTavern();

  const [remoteBrokerId, setRemoteBrokerId] = useState<string>('');

  const connectPeer = () => {
    dispatch({ type: 'CONNECT' });
    connect({ state, dispatch }, { remoteBrokerId });
  };

  const disconnectPeer = () => {
    dispatch({ type: 'DISCONNECT' });
    state.peerInstance?.destroy();
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRemoteBrokerId(event.currentTarget.value);
  };

  const printButtonText = (status: string) => {
    switch (status) {
      case 'DISCONNECTING':
        return 'Disconnecting...';
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return status;
    }
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
      <button className="btn" onClick={connectPeer}>
        {printButtonText(state.connectionStatus)}
      </button>
    </>
  );

  const renderDisconnect = () => (
    <button className="btn" onClick={disconnectPeer}>
      {printButtonText(state.connectionStatus)}
    </button>
  );

  return state.connectionStatus === 'CONNECTED'
    ? renderDisconnect()
    : renderConnect();
};
