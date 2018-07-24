import firebase from 'firebase';

const prodConfig = {
    apiKey: "AIzaSyBqrt990gofaOgxf7V3IJCJDoS96eXMLJI",
    authDomain: "podrao-88da8.firebaseapp.com",
    databaseURL: "https://podrao-88da8.firebaseio.com",
    projectId: "podrao-88da8",
    storageBucket: "podrao-88da8.appspot.com",
    messagingSenderId: "825987930581"
};

const devConfig = {
    apiKey: "AIzaSyBqrt990gofaOgxf7V3IJCJDoS96eXMLJI",
    authDomain: "podrao-88da8.firebaseapp.com",
    databaseURL: "https://podrao-88da8.firebaseio.com",
    projectId: "podrao-88da8",
    storageBucket: "podrao-88da8.appspot.com",
    messagingSenderId: "825987930581"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();