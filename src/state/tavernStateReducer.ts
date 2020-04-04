interface TavernState {
  connectionStatus: string;
  brokerId: string | null;
}

export const initialState: TavernState = {
  connectionStatus: 'NOT_CONNECTED',
  brokerId: null,
};

export interface ConnectedAction {
  type: 'CONNECTED';
  brokerId: string | null;
}

export interface ConnectAction {
  type: 'CONNECT';
}

type ReducerActions = ConnectedAction | ConnectAction;

export interface TavernStateContext {
  state: TavernState;
  dispatch: React.Dispatch<ReducerActions>;
}

export const tavernStateReducer = (
  state: TavernState,
  action: ReducerActions,
) => {
  switch (action.type) {
    case 'CONNECT':
      return { ...state, connectionStatus: 'CONNECTING' };
    case 'CONNECTED':
      return {
        ...state,
        brokerId: action.brokerId,
        connectionStatus: 'CONNECTED',
      };
  }
};
