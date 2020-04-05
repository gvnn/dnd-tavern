import React, { useState, Fragment } from 'react';
import { useTavern } from '../state/tavern';
import { connect } from '../utils/peer';

export const PeerConnector = () => {
  const { state, dispatch } = useTavern();

  const [remoteBrokerId, setRemoteBrokerId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const connectPeer = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: 'CONNECT' });
    connect({ state, dispatch }, { remoteBrokerId, nickname });
  };

  const disconnectPeer = () => {
    dispatch({ type: 'DISCONNECT' });
    state.peerInstance?.destroy();
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRemoteBrokerId(event.currentTarget.value);
  };

  const onNicknameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setNickname(event.currentTarget.value);
  };

  const copyToClipboard = (toCopy: string) => {
    navigator.clipboard.writeText(toCopy);
  };

  const printButtonText = (status: string) => {
    switch (status) {
      case 'NOT_CONNECTED':
        return 'Connect';
      case 'CONNECTED':
        return 'Disconnect';
      case 'DISCONNECTING':
        return 'Disconnecting...';
      case 'CONNECTING':
        return 'Connecting...';
      default:
        return status;
    }
  };

  const renderConnect = () => (
    <form onSubmit={connectPeer}>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Connect</div>
        </div>
        <div className="panel-body">
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
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="My Nickname"
              autoComplete="off"
              spellCheck="false"
              value={nickname}
              onChange={onNicknameChange}
            ></input>
          </div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-primary">
            {printButtonText(state.connectionStatus)}
          </button>
        </div>
      </div>
    </form>
  );

  const renderDisconnect = () => (
    <div className="panel">
      <div className="panel-header">Connected</div>
      <div className="panel-body">
        {state.isHost && (
          <>
            <p>You are the host! Share this code with your friend</p>
            <p>
              <code>{state.remoteBrokerId}</code>
              <button
                className="btn btn-link"
                onClick={() => copyToClipboard(state.remoteBrokerId ?? '')}
              >
                copy to clipboard
              </button>
            </p>
          </>
        )}
        {!state.isHost && (
          <>
            <p>You are connected with the following hosts</p>
            <dl>
              {state.connections.map((c) => (
                <Fragment key={c.peer}>
                  <dt>{c.peer}</dt>
                  <dd>
                    {c.metadata ? `With nickname ${c.metadata.nickname}` : ''}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </>
        )}
      </div>
      <div className="panel-footer">
        <button className="btn" onClick={disconnectPeer}>
          {printButtonText(state.connectionStatus)}
        </button>
      </div>
    </div>
  );

  return state.connectionStatus === 'CONNECTED'
    ? renderDisconnect()
    : renderConnect();
};
