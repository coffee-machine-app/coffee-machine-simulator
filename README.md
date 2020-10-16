# coffee-machine-simulator
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
Simulate the coffee machine
	
## Technologies
Project is created with:
* Vue native version: 4.5.4
* Firebase version: 7.23.0

	
## Setup

* For running the project server, install the expo-cli:

```
$ npm install --global expo-cli
```
* Firebase Configuration <br> <br>
You have to add your firebase config into "firebase/config.js". <br> 

```
var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};
```

For more details : https://firebase.google.com/docs/web/setup#node.js-apps <br>
Also, you need to create a collection "status" on your cloud firestore.

* To run this project, install it locally using npm:

```
$ cd coffee-machine-simulator
$ npm install
$ npm start
```
