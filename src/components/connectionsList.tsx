import React, { Fragment } from 'react';
import { useTavern } from '../state/tavern';

export const ConnectionsList = () => {
  const { state } = useTavern();

  const renderList = () => (
    <div className="panel mt-2">
      <div className="panel-header">
        <div className="panel-title">Connections</div>
      </div>
      <div className="panel-body">
        <p>Below a list of connected peers:</p>
        <dl>
          {state.connections.map((c) => (
            <Fragment key={c.peer}>
              <dt>{c.peer}</dt>
              <dd>
                {c.metadata ? `With nickname ${c.metadata.nickname}` : ''}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
      <div className="panel-footer"></div>
    </div>
  );

  if (state.isHost) {
    return renderList();
  }

  return null;
};
