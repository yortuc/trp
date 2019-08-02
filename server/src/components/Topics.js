import React from 'react';

function Topics(props) {
  return (
    <div id="topics">
        <h1>konular</h1>
        <ul>
        { props.topics.map((topic) => 
            <li><a href="/t/{ topic.title }">{ topic.title }</a></li>
        )}
        </ul>
    </div>
  );
}

export default Topics;
