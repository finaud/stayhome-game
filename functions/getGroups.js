const {
    functions,
    db,
} = require('./admin');

const getGroups = (data, context) => {
    const username = data.username;

    return db.collection('users').doc(username).get()
        .then(async snap => {
            let data  = [];

            for (const group_ref of snap.data()['groups']) {
                await group_ref.get().then(group_snap => {
                    data.push(group_snap.data()['name']);
                })
            }

            console.log({groups: data});

            return {groups: data};
        })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });

}

module.exports = getGroups;