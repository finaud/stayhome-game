const {
    functions,
    db,
    admin,
} = require('./admin');
let FieldValue = admin.firestore.FieldValue;

const inviteToGroup = (data, context) => {

    // Message info passed from the client.
    const username_ref = db.collection('users').doc(data.username);
    const group_ref = db.collection('groups').doc(data.group);

    group_ref.update({
        participants: FieldValue.arrayUnion(username_ref),
    });

    return username_ref.update({
        groups: FieldValue.arrayUnion(group_ref),
    }).then(() => {
        console.log(`Added ${username_ref.id} to group ${group_ref.id}`);
        // Returning the sanitized message to the client.
    }).then(() => {
        username_ref.get().then(doc => {
            const message = {  notification: {
                    title: `Friend Update`,
                    body: `You were added to the group ${group_ref.id}!`,
                },
                token: doc.data()['token']
            };

            admin.messaging().send(message)
                .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        });

        return { msg: "success" };
    })
        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = inviteToGroup;