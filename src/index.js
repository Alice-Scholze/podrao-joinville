import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqrt990gofaOgxf7V3IJCJDoS96eXMLJI",
    authDomain: "podrao-88da8.firebaseapp.com",
    databaseURL: "https://podrao-88da8.firebaseio.com",
    storageBucket: "podrao-88da8.appspot.com"
  };
  firebase.initializeApp(config);

  ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();