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
                }
            })
        }
    } else {
        console.log("someone moved in their house");
    }
}

module.exports = checkLoss;
