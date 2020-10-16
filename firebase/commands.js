import { firebase } from './config.js'

const DOINGLONG = "doing long coffee";
const DOINGSHORT = "doing short coffee";
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
            console.log(DOINGSHORT);
            sendStatus(DOINGSHORT);
            status.length = 0;
            status.push(DOINGSHORT);
            setTimeout(function () {
                sendStatus(WAIT);
                status.length = 0;
                status.push(WAIT);
            }, 5000);

        } else if (status == LONG) {
            console.log(DOINGLONG);
            sendStatus(DOINGLONG);
            status.length = 0;
            status.push(DOINGLONG);
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
