// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.firestoreTest = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;

    console.log("text: ", original);

    let doc = await db.collection('cities').doc('LA').set({
        text: original
    });

    return res.json({
        msg: "updated text??" + original
    });
});