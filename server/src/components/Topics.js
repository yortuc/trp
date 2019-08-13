import React from 'react';
import mb from './../trpcore/MessageBus';

function topicClicked(topic, e) {
  mb.say("/topics/topicClicked", topic)
  e.preventDefault()
  return false
}

function Topics(props) {
  return (
    <div id="topics">
        <h1>konular</h1>
        <ul>
        { props.topics.map((topic) => 
            <li key={topic.title}>
              <a href={ topic.title } onClick={ (e)=> topicClicked(topic.title, e)  }>{ topic.title }</a>
            </li>
        )}
        </ul>
    </div>
  );
}

export default Topics;
