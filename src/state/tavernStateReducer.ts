import Peer from 'peerjs';

interface DiceRoll {
  result: string;
  total: number;
  peer: string;
}

interface TavernState {
  connectionStatus: string;
  brokerId: string | null;
  remoteBrokerId: string | null;
  peerInstance: Peer | null;
  isHost: boolean;
  connections: Peer.DataConnection[];
  err: any;
  lastReceivedData: any;
  rolls: DiceRoll[];
}

export const initialState: TavernState = {
  connectionStatus: 'NOT_CONNECTED',
  brokerId: null,
  remoteBrokerId: null,
  peerInstance: null,
  isHost: false,
  connections: [],
  err: undefined,
  lastReceivedData: undefined,
  rolls: [],
};

export interface ConnectedAction {
  type: 'CONNECTED';
  brokerId: string;
  remoteBrokerId: string;
}

export interface ConnectAction {
  type: 'CONNECT';
}

export interface DisconnectAction {
  type: 'DISCONNECT';
}

export interface DisconnectedAction {
  type: 'DISCONNECTED';
}

export interface PeerErrorAction {
  type: 'PEER_ERROR';
  err: any;
}

export interface SetPeerAction {
  type: 'SET_PEER';
  peerInstance: Peer;
}

export interface NewConnectionAction {
  type: 'NEW_CONNECTION';
  connection: Peer.DataConnection;
}

export interface ConnectionClosedAction {
  type: 'CLOSED_CONNECTION';
  connection: Peer.DataConnection;
}

export interface RollerAction {
  type: 'ROLL';
  result: string;
  total: number;
  peer: string;
}

type ReducerActions =
  | ConnectedAction
  | ConnectAction
  | DisconnectAction
  | DisconnectedAction
  | SetPeerAction
  | PeerErrorAction
  | NewConnectionAction
  | ConnectionClosedAction
  | RollerAction;

export interface TavernStateContext {
  state: TavernState;
  dispatch: React.Dispatch<ReducerActions>;
}

const appendConnection = (
  existing: Peer.DataConnection[],
  newConnection: Peer.DataConnection,
) => [
  ...existing.filter((conn) => conn.peer !== newConnection.peer),
  newConnection,
];

export const tavernStateReducer = (
  state: TavernState,
  action: ReducerActions,
) => {
  switch (action.type) {
    case 'SET_PEER':
      return { ...state, peerInstance: action.peerInstance };
    case 'CONNECT':
      return { ...state, connectionStatus: 'CONNECTING' };
    case 'DISCONNECT':
      return { ...state, connectionStatus: 'DISCONNECTING' };
    case 'DISCONNECTED':
      return initialState;
    case 'PEER_ERROR':
      return { ...state, connectionStatus: 'ERROR', err: action.err };
    case 'NEW_CONNECTION':
      return {
        ...state,
        connections: appendConnection(state.connections, action.connection),
      };
    case 'CLOSED_CONNECTION':
      return {
        ...state,
        connections: state.connections.filter(
          (conn) => conn.peer !== action.connection.peer,
        ),
      };
    case 'CONNECTED':
      return {
        ...state,
        brokerId: action.brokerId,
        remoteBrokerId: action.remoteBrokerId,
        connectionStatus: 'CONNECTED',
        isHost: action.brokerId === action.remoteBrokerId,
      };
    case 'ROLL':
      return {
        ...state,
        rolls: state.rolls.concat({
          result: action.result,
          total: action.total,
          peer: action.peer,
        }),
      };
  }
};
