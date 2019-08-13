import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import mb from "./../trpcore/MessageBus";


class UserProfile extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("MEVCUT KULLANICI:", user);
            mb.say("/user/authStateChanged", user);
        });
    }

    render() {
        return (
            <div>Hello</div>
        )
    }
  }
  
export default UserProfile;