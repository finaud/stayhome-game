const {
    functions,
    db,
} = require('./admin');

const addUser = (data, context) => {

    // Message info passed from the client.
    const name = data.name;
    const username = data.username;
    const email = data.email;
    const token = data.token;
    const friends = [];
    const groups = [];

    // Saving the new message to the Realtime Database.
    return db.collection('users').doc(username).set({
        name, username, email, friends, groups, token
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