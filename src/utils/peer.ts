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
    connection.on('data', console.log);
  });
};

const connectAsClient = (
  { dispatch }: TavernStateContext,
  peer: Peer,
  { brokerId, remoteBrokerId }: { brokerId: string; remoteBrokerId: string },
) => {
  const remoteConnection = peer.connect(remoteBrokerId);
  remoteConnection.on('open', function () {
    dispatch({ type: 'CONNECTED', brokerId, remoteBrokerId });
    dispatch({ type: 'NEW_CONNECTION', connection: remoteConnection });
  });
  remoteConnection.on('data', console.log);
};

export const connect = (
  ctx: TavernStateContext,
  opts: { remoteBrokerId: string },
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
