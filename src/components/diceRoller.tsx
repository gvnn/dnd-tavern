import React, { useState } from 'react';
import { roller } from '../utils/roller';
import { DiceResult } from 'dice-typescript';

export const DiceRoller = () => {
  const [roll, setRoll] = useState<DiceResult | undefined>(undefined);
  const [rollValue, setRollValue] = useState<string>('');

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRollValue(event.currentTarget.value);
  };

  const rollDice = (event: React.FormEvent) => {
    event.preventDefault();
    if (rollValue) {
      setRoll(roller.roll(rollValue));
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
          <div className="panel-title">Rice roller</div>
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
