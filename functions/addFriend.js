const {
    functions,
    db,
    admin,
} = require('./admin');
let FieldValue = admin.firestore.FieldValue;

const addFriend = (data, context) => {

    // Message info passed from the client.
    const ref1 = db.collection('users').doc(data.username);
    const ref2 = db.collection('users').doc(data.friend_username);

    return ref2.get()
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                ref1.update({
                    friends: FieldValue.arrayUnion(ref2),
                });

                return ref2.update({
                    friends: FieldValue.arrayUnion(ref1),
                }).then(() => {
                    console.log(`added ${ref1.id} and ${ref2.id} as friends`);
                    // Returning the sanitized message to the client.
                }).then(() => {
                    ref2.get().then(doc => {
                        const message = {
                            notification: {
                                title: `Friend Update`,
                                body: `${data.username} added you as a friend!`,
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

                    return {msg: "success"};
            })} else {
                return {msg: "user doesn't exist"};
    }})
        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = addFriend;