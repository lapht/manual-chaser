import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCB6G_syY8WTIn3aANmKx--Z9LpbpLuP8c",
    authDomain: "manualchaser.firebaseapp.com",
    databaseURL: "https://manualchaser.firebaseio.com",
    projectId: "manualchaser",
    storageBucket: "manualchaser.appspot.com",
    messagingSenderId: "642542122244",
    appId: "1:642542122244:web:bf4f2fd613422a62860c51",
    measurementId: "G-NTWHYBZN7G"
};
firebase.initializeApp(config);
export default firebase;