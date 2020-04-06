import Peer from 'peerjs';
import { TavernStateContext } from '../state/tavernStateReducer';

const connectAsHost = (
  { dispatch }: TavernStateContext,
  peer: Peer,
  { brokerId, remoteBrokerId }: { brokerId: string; remoteBrokerId: string },
) => {
  dispatch({ type: 'CONNECTED', brokerId, remoteBrokerId });
  peer.on('connection', (connection) => {
    dispatch({ type: 'NEW_CONNECTION', connection });
    connection.on('data', (data) => {
      dispatch({ type: 'DATA', data });
    });
    connection.on('close', () => {
      dispatch({ type: 'CLOSED_CONNECTION', connection });
    });
  });
};

const connectAsClient = (
  { dispatch }: TavernStateContext,
  peer: Peer,
  {
    brokerId,
    remoteBrokerId,
    nickname,
  }: { brokerId: string; remoteBrokerId: string; nickname: string },
) => {
  const remoteConnection = peer.connect(remoteBrokerId, {
    metadata: { nickname },
  });
  remoteConnection.on('open', () => {
    dispatch({ type: 'CONNECTED', brokerId, remoteBrokerId });
    dispatch({ type: 'NEW_CONNECTION', connection: remoteConnection });
  });
  remoteConnection.on('close', () => {
    dispatch({ type: 'CLOSED_CONNECTION', connection: remoteConnection });
  });
  remoteConnection.on('data', (data) => {
    dispatch({ type: 'DATA', data });
  });
};

export const connect = (
  ctx: TavernStateContext,
  opts: { remoteBrokerId: string; nickname: string },
) => {
  const { state, dispatch } = ctx;

  if (state.peerInstance !== null) {
    return;
  }

  const peerInstance = new Peer({
    key: 'beer',
    host: 'dnd-tavern-server.herokuapp.com',
    secure: true,
  });

  peerInstance.on('open', (id) => {
    if (opts.remoteBrokerId !== '' && opts.remoteBrokerId !== id) {
      connectAsClient(ctx, peerInstance, {
        brokerId: id,
        remoteBrokerId: opts.remoteBrokerId,
        nickname: opts.nickname,
      });
    } else {
      connectAsHost(ctx, peerInstance, {
        brokerId: id,
        remoteBrokerId: id,
      });
    }
  });

  peerInstance.on('error', (err) => dispatch({ type: 'PEER_ERROR', err }));

  peerInstance.on('disconnected', () => {
    dispatch({ type: 'DISCONNECTED' });
  });

  dispatch({ type: 'SET_PEER', peerInstance });
};
