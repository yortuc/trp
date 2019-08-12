import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import DBHelper from './trpcore/db_helper';
import DataStore from './trpcore/DataStore';

const renderApp = ()=> 
    ReactDOM.render(<App topics={ dataStore.state.topics } entries = { dataStore.state.entries } currentTopic={ dataStore.state.currentTopic } />,
        document.getElementById('root'));

const firebaseConfig = {
    apiKey: "AIzaSyCVgW5rXXbR3gMxX4e6b0Gow2KK4M1ug7Y",
    authDomain: "ratepi-11ba3.firebaseapp.com",
    databaseURL: "https://ratepi-11ba3.firebaseio.com",
    projectId: "ratepi-11ba3",
    storageBucket: "ratepi-11ba3.appspot.com",
    messagingSenderId: "820070006558",
    appId: "1:820070006558:web:dd75896ed98c11e1"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dataStore = new DataStore({
    currentTopic: 'loading..,',
    topics: [],
    entries: [],
    user: null
}, [
    function(state, message, payload) {
        switch (message) {
            case "/topics/currentTopicChanged":
                return {...state, currentTopic: payload}
            case "/topics/topicsChanged":
                return {...state, topics: payload}
            case "/entries/changed":
                return {...state, entries: payload}
        }
    }
])
const db_helper = new DBHelper(firebase);

let topicChangedListener = null
const currentTopicChanged = (topic) => {
    dataStore.reduce("/topics/currentTopicChanged",topic)

    if(topicChangedListener){
        topicChangedListener.unregister()
    }

    topicChangedListener = db_helper.listenCollectionWith("entries", ["topic", "==", topic], 
        (entries)=> {
            dataStore.reduce("/entries/changed", entries)
            renderApp()
        }
    )
}

const topicsChanged = (topics) => {
    console.log("topics changed: ", topics)
    dataStore.reduce("/topics/topicsChanged", topics)

    currentTopicChanged(topics[0].title)
}

db_helper.listenCollection("topics", topicsChanged);

try {
    let app = firebase.app();
    let features = ['auth', 'database', 'firestore', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    console.log(`Firebase SDK loaded with ${features.join(', ')}`);
} catch (e) {
    console.error(e);
    console.log('Error loading the Firebase SDK, check the console.');
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
