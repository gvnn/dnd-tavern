import React from 'react';
import { useTavern } from '../state/tavern';
import objectPath from 'object-path';

export const ConnectionStatus = () => {
  const { state } = useTavern();

  const printStatePath = (path: string) => {
    const value = objectPath.get(state, path, null);
    if (value !== null) {
      return (
        <span className="mr-1">
          {path}:{''}
          <code className="ml-1">{value}</code>
        </span>
      );
    }
    return null;
  };

  return (
    <div className="toast toast-status">
      <p>
        {printStatePath('connectionStatus')}
        {printStatePath('brokerId')}
      </p>
    </div>
  );
};
