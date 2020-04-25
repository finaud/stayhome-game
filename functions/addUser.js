const {
    functions,
    db,
} = require('./admin');

const addUser = (data, context) => {

    // Message info passed from the client.
    const name = data.name;
    const username = data.username;
    const email = data.email;

    // Saving the new message to the Realtime Database.
    return db.collection('users').doc(username).add({
        name, username, email
    }).then(() => {
        console.log('New user created: ' + username);
        // Returning the sanitized message to the client.
        return { msg: "success" };
    })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = addUser;