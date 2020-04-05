import React from 'react';
import { useTavern } from '../state/tavern';

export const ConnectionsList = () => {
  const { state } = useTavern();
  return (
    <ul>
      {state.connections.map((conn) => (
        <li key={conn.peer}>
          {conn.peer} ({conn.metadata?.nickname})
        </li>
      ))}
    </ul>
  );
};
