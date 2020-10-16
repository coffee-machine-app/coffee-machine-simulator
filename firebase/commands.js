import { firebase } from './config.js'

const MAKINGLONG = "making long coffee";
const MAKINGSHORT = "making short coffee";
const SHORT = "short";
const LONG = "long";
const WAIT = "wait";

async function checkStatus(status) {
    //Search all the messages not from the user
    firebase.firestore().collection('status').orderBy("timestamp", "desc").limit(1).onSnapshot(async function (result) {
        var timestamp = Date.now();
        var now = Date.now();

        //Check if there is changes
        result.docChanges().forEach(function (doc) {
            //If the message is added
            if (doc.type == 'added') {
                status.length = 0;
                status.push(doc.doc.data().status);
                timestamp = doc.doc.data().timestamp;
            }
        });

        //Manage if the machine stop working during making the coffee
        if (status != WAIT && now > timestamp + 60000) {
            sendStatus(WAIT);
            status.length = 0;
            status.push(WAIT);
        }

        if (status == SHORT) {
            console.log(MAKINGSHORT);
            sendStatus(MAKINGSHORT);
            status.length = 0;
            status.push(MAKINGSHORT);
            setTimeout(function () {
                sendStatus(WAIT);
                status.length = 0;
                status.push(WAIT);
            }, 5000);

        } else if (status == LONG) {
            console.log(MAKINGLONG);
            sendStatus(MAKINGLONG);
            status.length = 0;
            status.push(MAKINGLONG);
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
