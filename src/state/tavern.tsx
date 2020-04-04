import React, { useReducer, useContext, createContext } from 'react';
import {
  tavernStateReducer,
  initialState,
  TavernStateContext,
} from './tavernStateReducer';

const TavernContext = createContext<TavernStateContext>({
  state: initialState,
  dispatch: () => {},
});

export const TavernProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const [tavernState, tavernDispatch] = useReducer(
    tavernStateReducer,
    initialState,
  );

  return (
    <TavernContext.Provider
      value={{ state: tavernState, dispatch: tavernDispatch }}
    >
      {children}
    </TavernContext.Provider>
  );
};

export const useTavern = () => useContext(TavernContext);
