const {
    functions,
    db,
} = require('./admin');

const addFriend = (data, context) => {
    const username = data.username;

    return db.collection('users').doc(username).get()
        .then(async snap => {
            let data  = [];

            for (const friend_ref of snap.data()['friends']) {
                await friend_ref.get().then(friend_snap => {
                    data.push({
                        username: friend_snap.data()['username'],
                        name: friend_snap.data()['name'],
                    });
                })
            }

            console.log({friends: data});

            return {friends: data};
        })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });

}

module.exports = addFriend;