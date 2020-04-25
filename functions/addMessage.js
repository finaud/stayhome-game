const {
    functions,
    db,
} = require('./admin');

/**
 * Reads a doc from Firestore and sends it's data in the response.
 *
 * @param {Object} req Express Request Object
 * @param {Object} res Express Request Object
 */
const addMessage = (data, context) => {

    // Message text passed from the client.
    const text = data.text;
    const uid = data.uid;

    // Checking attribute.
    if (!(typeof text === 'string') || text.length === 0) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "text" containing the message text to add.');
    }

    // Saving the new message to the Realtime Database.
    const sanitizedMessage = "sanitized: " + text; // Sanitize the message.
    return db.collection('cities').doc('LA').set({
        text: sanitizedMessage,
        author: uid,
    }).then(() => {
        console.log('New Message written');
        // Returning the sanitized message to the client.
        return { text: sanitizedMessage };
    })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = addMessage;