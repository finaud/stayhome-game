const {
    functions,
    db,
} = require('./admin');

const getShames = (data, context) => {

    return db.collection('shames').get()
        .then(snap => {
            let data  = [];

            snap.forEach(doc => {
                data.push(doc.data()['text']);
            });

            console.log({shames: data});

            return {shames: data};
        })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });

}

module.exports = getShames;