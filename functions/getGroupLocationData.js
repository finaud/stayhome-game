const {
    functions,
    db,
} = require('./admin');

const getGroupLocationData = (data, context) => {
    const groupname = data.group;

    return db.collection('groups').doc(groupname).get()
        .then(async snap => {
            let data  = [];

            for (const user_ref of snap.data()['participants']) {
                await user_ref.get().then(user_snap => {
                    let username = user_ref.id;
                    let coords = user_snap.data()['currentLocation'];
                    data.push({[username]: [coords.longitude, coords.latitude]});
                })
            }

            return {locations: data};
        })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });

}

module.exports = getGroupLocationData;