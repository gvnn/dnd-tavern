import React, { useState } from 'react';
import { roller } from '../utils/roller';
import { DiceResult } from 'dice-typescript';
import { useTavern } from '../state/tavern';

export const DiceRoller = () => {
  const { state } = useTavern();

  const [roll, setRoll] = useState<DiceResult | undefined>(undefined);
  const [rollValue, setRollValue] = useState<string>('');

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRollValue(event.currentTarget.value);
  };

  const rollDice = (event: React.FormEvent) => {
    event.preventDefault();
    if (rollValue) {
      const rollResult = roller.roll(rollValue);
      setRoll(rollResult);
      state.connections.forEach((c) => {
        c.send({
          type: 'ROLL',
          result: rollResult.renderedExpression,
          total: rollResult.total,
        });
      });
    }
  };

  const outputRoll = () => {
    if (roll) {
      return (
        <>
          <span className="label label-secondary mr-1">
            {roll.renderedExpression}
          </span>
          <span className="label label-primary">{roll.total}</span>
        </>
      );
    }
    return null;
  };

  return (
    <form onSubmit={rollDice}>
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Rollin'</div>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="1d20 or 3d6 or [n]d[side]"
              autoComplete="off"
              spellCheck="false"
              value={rollValue}
              onChange={onChange}
            ></input>
          </div>
          <div>{outputRoll()}</div>
        </div>
        <div className="panel-footer">
          <button type="submit" className="btn btn-primary">
            Roll
          </button>
        </div>
      </div>
    </form>
  );
};
