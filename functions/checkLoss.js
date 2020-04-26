const {
    functions,
    db,
    admin,
} = require('./admin');
let FieldValue = admin.firestore.FieldValue;

const geolib = require('geolib');

const distance = 500;

const checkLoss = (change, context) => {

    const oldData = change.before.data();
    const newData = change.after.data();

    const name = newData['name'];

    // Checking the location has changed
    if (oldData['currentLocation'] === newData['currentLocation']) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'Location hasn\'t changed');
    } else if (!geolib.isPointWithinRadius([
            newData['currentLocation'].longitude, newData['currentLocation'].latitude],
        [newData['homeLocation'].longitude, newData['homeLocation'].latitude], distance)) {

        console.log("SOMEONE LEFT THEIR HOUSE!");

        for (let group of newData['groups']) {
            group.get().then(doc => {
                if (doc.data()['status'] === 'ACTIVE') {
                    // Create a notification if someone is eliminated
                    group.collection('notifications').add({
                        text: 'Oh no! ' + newData['name'] + ' has left their house!',
                    }).then(ref => {
                        console.log('Added notification with ID: ', ref.id);
                    });

                    // Removes user from the participating group members and adds them to those eliminated
                    group.update({
                        participants: FieldValue.arrayRemove(change.after.ref),
                        eliminated: FieldValue.arrayUnion(change.after.ref),
                    })

                    // Notify other group members
                    group.get().then(snap => {
                        snap.data()['participants'].forEach(participant => {
                            participant.get().then(participant_snap => {
                                const message = {  notification: {
                                        title: `Group ${group.id} Update`,
                                        body: `${name} has left their house! Check the app to see who is abiding stay-at-home!`,
                                    },
                                    token: participant_snap.data()['token']
                                };

                                admin.messaging().send(message)
                                    .then((response) => {
                                        // Response is a message ID string.
                                        console.log('Successfully sent message:', response);
                                    })
                                    .catch((error) => {
                                        console.log('Error sending message:', error);
                                    });
                            })
                        })
                    });
                }
            })
        }
    } else {
        console.log("someone moved in their house");
    }
}

module.exports = checkLoss;
