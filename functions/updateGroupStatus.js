const {
    functions,
    db,
} = require('./admin');

const updateGroupStatus = (data, context) => {

    // Message info passed from the client.
    const name = data.name;
    const status = data.status;

    return db.collection('groups').doc(name).update({
        status: status
    }).then(() => {
        console.log(`Group ${name} has changes to ${status}`);
        // Returning the sanitized message to the client.
        return { msg: `Successfully updated group status` };
    })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = updateGroupStatus;