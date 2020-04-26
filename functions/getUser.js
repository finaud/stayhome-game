const {
    functions,
    db,
} = require('./admin');

const getUser = (data, context) => {
     let email = data.email;

    return db.collection('users').where('email', '==', email).get()
        .then(snap => {
            if (snap.empty) {
                return {msg: 'No matching documents.'};
            }

            let tmp;

            // Assuming only one email in the database for each user
            snap.forEach(doc => {
                tmp = doc.data()            
            });

            return tmp;

        })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });

}

module.exports = getUser;
