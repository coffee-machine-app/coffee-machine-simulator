import { firebase } from './config.js'

//Status contants 
const MAKINGLONG = "making long coffee";
const MAKINGSHORT = "making short coffee";
const SHORT = "short";
const LONG = "long";
const WAIT = "wait";

//Manage the changes of the database
async function checkStatus(status) {
    var initBool = true;
    //Get the last status saved in the database 
    firebase.firestore().collection('status').orderBy("timestamp", "desc").limit(1).onSnapshot(async function (result) {
        var timestamp = Date.now();
        var now = Date.now();

        //Check if there is changes
        result.docChanges().forEach(function (doc) {
            //If the document is added
            if (doc.type == 'added') {
                status.length = 0;
                status.push(doc.doc.data().status);
                timestamp = doc.doc.data().timestamp;
            }
        });

        //Manage the launch of the machine
        if (initBool) {
            sendStatus(WAIT);
            status.length = 0;
            status.push(WAIT);
            initBool = false;
        }

        //If the coffee order is a short one
        if (status == SHORT) {
            console.log(MAKINGSHORT);
            sendStatus(MAKINGSHORT);
            status.length = 0;
            status.push(MAKINGSHORT);
            //Wait for 5 seconds the coffee to be made
            setTimeout(function () {
                sendStatus(WAIT);
                status.length = 0;
                status.push(WAIT);
            }, 5000);
        }
        //If the coffee order is a long one 
        else if (status == LONG) {
            console.log(MAKINGLONG);
            sendStatus(MAKINGLONG);
            status.length = 0;
            status.push(MAKINGLONG);
            //Wait for 10 seconds the coffee to be made
            setTimeout(function () {
                sendStatus(WAIT);
                status.length = 0;
                status.push(WAIT);
            }, 10000);
        }
    });
    return status;
}

//Create a command in firestore
async function sendStatus(status) {
    try {
        console.log("send this status :", status);
        var id = Date.now();
        await firebase.firestore().collection('status').doc().set({
            key: id,
            status: status,
            time: new Date(),
            timestamp: id
        });
        return {
            status: status,
            time: new Date(),
            timestamp: Date.now()
        }
    } catch (e) {
        console.log(e.toString())
        return null;
    }
}

export { checkStatus, sendStatus, WAIT };
