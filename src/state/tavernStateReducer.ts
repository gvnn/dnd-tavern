import Peer from 'peerjs';

interface TavernState {
  connectionStatus: string;
  brokerId: string | null;
  remoteBrokerId: string | null;
  peerInstance: Peer | null;
  isHost: boolean;
}

export const initialState: TavernState = {
  connectionStatus: 'NOT_CONNECTED',
  brokerId: null,
  remoteBrokerId: null,
  peerInstance: null,
  isHost: false,
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

export interface SetPeerAction {
  type: 'SET_PEER';
  peerInstance: Peer;
}

type ReducerActions =
  | ConnectedAction
  | ConnectAction
  | DisconnectAction
  | DisconnectedAction
  | SetPeerAction;

export interface TavernStateContext {
  state: TavernState;
  dispatch: React.Dispatch<ReducerActions>;
}

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
    case 'CONNECTED':
      return {
        ...state,
        brokerId: action.brokerId,
        remoteBrokerId: action.remoteBrokerId,
        connectionStatus: 'CONNECTED',
        isHost: action.brokerId === action.remoteBrokerId,
      };
  }
};
