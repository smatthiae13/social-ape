const functions = require('firebase-functions');
const admin = require('firebase-admin');       //needs access to the database

admin.initializeApp(); //we have access to admin object                 //to use admin we need to initialize the application

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {  //use postman to check with GET
 response.send("Hello Sam!");
});

//fetch therse
exports.getScreams = functions.https.onRequest((req, res) => {
    admin.firestore().collection('screams')       //getting info from our collection, in example from firebase it is labed as db.collection('name of collection')
    .get()
    .then((data) => {
        let screams = [];
        data.forEach((doc) => {
            screams.push(doc.data());    // (doc is jusst a reference)data is a function that returns the data instde the document
        });         //after for loop, the screams array should be filled with the data of the screams
        return res.json(screams);            //now we have to return them
    })
    .catch(err => console.error(err));
});
