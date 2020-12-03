// Import all needed modules.
const algoliasearch = require('algoliasearch');
const firebase = require('firebase');

/*import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch';
import firebase from 'firebase';*/

// Set up Firestore.
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
const db = firebase.firestore();

// Set up Algolia.
// The app id and API key are coming from the cloud functions environment, as we set up in Part 1, Step 3.
const algoliaClient = algoliasearch("XJH23A38DB", "9d11533f9834cc8edfa503ec55fd67f3");
// Since I'm using develop and production environments, I'm automatically defining 
// the index name according to which environment is running. functions.config().projectId is a default 
// property set by Cloud Functions.
const collectionIndexName = 'manualchaser_product';
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

// Create a HTTP request cloud function.
//export const sendCollectionToAlgolia = functions.https.onRequest(async (req, res) => {

	// This array will contain all records to be indexed in Algolia.
	// A record does not need to necessarily contain all properties of the Firestore document,
	// only the relevant ones. 
	let algoliaRecords = [];

    db.collection('products').get().then(
        function (querySnapshot) {
            querySnapshot.forEach(doc => {
                const document = doc.data();
                console.log("Importing ", doc.id);
                // Essentially, you want your records to contain any information that facilitates search, 
                // display, filtering, or relevance. Otherwise, you can leave it out.
                const record = {
                    objectID: doc.id,
                    brand: document.brand,
                    description: document.description,
                    name: document.name,
                    imgurl: document.imgurl
                };

                algoliaRecords.push(record);
            });

            // After all records are created, we save them to 
            collectionIndex.saveObjects(algoliaRecords, any => {
                //res.status(200).send("COLLECTION was indexed to Algolia successfully.");
                console.log("COLLECTION was indexed to Algolia successfully.");
            });
        }
    );

	// Retrieve all documents from the COLLECTION collection.
	/*let querySnapshot = db.collection('products').get();
    console.log(querySnapshot);

	querySnapshot.forEach(doc => {
		const document = doc.data();
        // Essentially, you want your records to contain any information that facilitates search, 
        // display, filtering, or relevance. Otherwise, you can leave it out.
        const record = {
            objectID: doc.id,
            brand: document.brand,
			description: document.description,
            name: document.name,
            imgurl: document.imgurl
        };

        algoliaRecords.push(record);
    });*/
	
	
	
//})
