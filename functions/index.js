const functions = require('firebase-functions');
const admin = require('firebase-admin');       //needs access to the database

admin.initializeApp(); //we have access to admin object                 //to use admin we need to initialize the application


const express = require('express');
const app = express();


//fetch these
app.get('/screams', (req, res) => {         //first paramenter is the name of the route and the second is the handler
    admin
    .firestore()
    .collection('screams')      //getting info from our collection, in example from firebase it is labed as db.collection('name of collection')
    .orderBy('createdAt', 'desc') 
    .get()
    .then((data) => {
        let screams = [];
        data.forEach((doc) => {
            screams.push({          //try to use spread operator --...doc.data() supported after node 6
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });                            
        });                              //after for loop, the screams array should be filled with the data of the screams
        return res.json(screams);        //now we have to return them
    })
    .catch(err => console.error(err));
})         



app.post('/scream', (req, res) => {
   
    const newScream = {                                     //this will be our object
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin
    .firestore()    //persist it from our db
    .collection('screams')
    .add(newScream)      //takes a json obj and add it to the database  - returns a promise
    .then((doc) => {        //givers us a document reference as a response
        res.json({ message: `document ${doc.id} created successfully`});                    //if we are here, the docusmtn has been created, and we can return a response
    })             
    .catch(err => {
        res.status(500).json({ error: 'something went wrong'});  //because of an error, we need to return a status code
        console.err(err);
    });

});


//
exports.api = functions.https.onRequest(app);       // this will turn into multiple routes-a container for the app

