import { firebase } from './config.js'

async function checkStatus(status) {
    //Search all the messages not from the user
    firebase.firestore().collection('status').orderBy("timestamp", "desc").limit(1).onSnapshot(async function (result) {;
        try{
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
            if(status != "wait" && now > timestamp+60000){
                sendStatus("wait");
                status.length = 0;
                status.push("wait");
            }

            if(status == "short"){
                console.log("doing short coffee");
                sendStatus("doing short coffee");
                status.length = 0;
                status.push("doing short coffee");
                setTimeout(function () { 
                    sendStatus("wait"); 
                    status.length = 0;
                    status.push("wait");
                }, 5000);
                
            } else if(status == "long"){
                console.log("doing long coffee");
                sendStatus("doing long coffee");
                status.length = 0;
                status.push("doing long coffee");
                setTimeout(function () { 
                    sendStatus("wait"); 
                    status.length = 0;
                    status.push("wait");
                }, 10000);
            }
        }
        catch(e){
            sendStatus("wait");
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

export { checkStatus, sendStatus };