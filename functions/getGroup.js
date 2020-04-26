const {
    functions,
    db,
} = require('./admin');

const getGroup = (data, context) => {
    const groupname = data.group;

    async function get_users (user_array)  {
        let tmp = [];

        for (const user_ref of user_array) {
            tmp.push(await user_ref.get()
                .then(snap => {
                    return {
                        name: snap.data()['name'],
                        username: snap.data()['username']
                    }
                })
            );
        }

        return tmp;
    };

    return db.collection('groups').doc(groupname).get()
        .then(async snap => {
            let snap_data = snap.data();
            data = {
                buyIn: snap_data['buyIn'],
                host: {
                    username: snap_data['host'].id,
                    name: await snap_data['host'].get().then(snap => { return snap.data()['name']} )
                },
                limit: snap_data['limit'],
                name: snap_data['name'],
                numWinners: snap_data['numWinners'],
                status: snap_data['status'],

                participants: await get_users(snap_data['participants']),
                eliminated: await get_users(snap_data['eliminated']),

            };

            return data;
        })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });

}

module.exports = getGroup;