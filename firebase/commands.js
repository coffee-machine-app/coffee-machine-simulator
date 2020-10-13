import { firebase } from './config.js'

async function checkStatus(status) {
    //Search all the messages not from the user
    firebase.firestore().collection('status').orderBy("timestamp", "desc").limit(1).onSnapshot(async function (result) {;
        //Check if there is changes
        if (status == "wait"){
            result.docChanges().forEach(function (doc) {
                //If the message is added
                if (doc.type == 'added') {
                    status.length = 0;
                    status.push(doc.doc.data().status);
                }
            });
        }
        if(status == "short"){
            console.log("short");
            sendStatus("doing short coffee");
            status.length = 0;
            status.push("doing short coffee");
            setTimeout(function () { 
                sendStatus("wait"); 
                status.length = 0;
                status.push("wait");
            }, 5000);
            
        } else if(status == "long"){
            console.log("long");
            sendStatus("doing long coffee");
            status.length = 0;
            status.push("doing long coffee");
            setTimeout(function () { 
                sendStatus("wait"); 
                status.length = 0;
                status.push("wait");
            }, 10000);
        }
    });
    return status;
}

//Create a command in firestore
async function sendStatus(status) {
    try {
       console.log(status);
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

export { checkStatus, sendStatus };
