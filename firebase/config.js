import firebase from 'firebase'

require("firebase/database");

//Get the config given by firebase
var firebaseConfig = {
};

firebase.initializeApp(firebaseConfig);

export { firebase };