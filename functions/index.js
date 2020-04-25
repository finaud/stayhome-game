// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Firestore database
const db = admin.firestore();

exports.addMessage = functions.https.onCall((data, context) => {

    // Message text passed from the client.
    const text = data.text;

    // Checking attribute.
    if (!(typeof text === 'string') || text.length === 0) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "text" containing the message text to add.');
    }
    // Checking that the user is authenticated.
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
            'while authenticated.');
    }

    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid || null;

    // Saving the new message to the Realtime Database.
    const sanitizedMessage = "sanitized: " + text; // Sanitize the message.
    return db.collection('cities').doc('LA').set({
        text: sanitizedMessage,
        author: { uid },
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return { text: sanitizedMessage };
    })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
});
