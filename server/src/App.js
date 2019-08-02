import React from 'react';
import Topics from './components/Topics';

function App(props) {
  return (
    <div className="App">
      <Topics topics={ props.topics } />
    </div>
  );
}

export default App;
