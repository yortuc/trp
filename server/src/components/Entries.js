import React from 'react';

function Topics(props) {
  return (
    <div id="entries">
        <h1>{ props.topic }</h1>
        { props.entries.map((entry) => 
            <div key={entry.data} className="entry">{entry.data}</div>
        )}
    </div>
  );
}

export default Topics;
