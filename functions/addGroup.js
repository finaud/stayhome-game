const {
    functions,
    db,
} = require('./admin');

const addGroup = (data, context) => {

    // Message info passed from the client.
    const name = data.name;
    const host = data.host;
    const limit = data.limit;
    const numWinners = data.numWinners;

    return db.collection('groups').doc(name).set({
        name, host, limit, numWinners
    }).then(() => {
        console.log('New group created: ' + name);
        // Returning the sanitized message to the client.
        return { msg: `Successfully created group ${name}` };
    })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = addGroup;