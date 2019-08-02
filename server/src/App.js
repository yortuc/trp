import React from 'react';
import Topics from './components/Topics';
import Entries from './components/Entries';

function App(props) {
  return (
    <div className="App">
      <Topics topics={ props.topics } />
      <Entries topic={ props.currentTopic } entries={ props.entries } />
    </div>
  );
}

export default App;
