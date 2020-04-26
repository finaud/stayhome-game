const {
    functions,
    db,
    admin,
} = require('./admin');
let FieldValue = admin.firestore.FieldValue;

const checkFinishedGame = (change, context) => {

    const oldData = change.before.data();
    const newData = change.after.data();

    // Checking the location has changed
    if (oldData['participants'].length !== newData['participants'].length && newData['participants'].length === 1) {
        // Throwing an HttpsError so that the client gets the error details.

        let winner = newData['participants'][0].id;

        console.log("GAME FINISHED");

        db.collection('groups').doc(newData['name']).update({
            status: "FINISHED"
        });

        for (let user of newData['eliminated']) {
            user.get().then(doc => {
                const message = {  notification: {
                        title: `Group ${newData['name']} Update`,
                        body: `${winner} has won the game!`,
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

                console.log(`Notified ${doc.data()["name"]}`);
            })
        }
    }
}

module.exports = checkFinishedGame;
