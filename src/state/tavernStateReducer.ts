import Peer from 'peerjs';

interface TavernState {
  connectionStatus: string;
  brokerId: string | null;
  peerInstance: Peer | null;
}

export const initialState: TavernState = {
  connectionStatus: 'NOT_CONNECTED',
  brokerId: null,
  peerInstance: null,
};

export interface ConnectedAction {
  type: 'CONNECTED';
  brokerId: string;
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
        connectionStatus: 'CONNECTED',
      };
  }
};
