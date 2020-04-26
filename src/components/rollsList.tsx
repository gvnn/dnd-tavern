import React, { Fragment } from 'react';
import { useTavern } from '../state/tavern';

export const RollsList = () => {
  const { state } = useTavern();

  const renderList = () => (
    <div className="panel mt-2">
      <div className="panel-header">
        <div className="panel-title">Rolls</div>
      </div>
      <div className="panel-body">
        <p>Who has rolled what:</p>
        {state.rolls.map((roll) => (
          <p key={roll.peer}>
            <span>{roll.peer}</span>
            <span className="label label-secondary mr-1">{roll.result}</span>
            <span className="label label-primary">{roll.total}</span>
          </p>
        ))}
      </div>
      <div className="panel-footer"></div>
    </div>
  );

  return renderList();
};
