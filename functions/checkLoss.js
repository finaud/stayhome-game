const {
    functions,
    db,
    admin,
} = require('./admin');
let FieldValue = admin.firestore.FieldValue;

// Something wrong here idek
const geolib = require('geolib');
import { isPointWithinRadius } from 'geolib';

const distance = 500;

const checkLoss = (change, context) => {

    const oldData = change.before.data();
    const newData = change.after.data();

    // Checking the location has changed
    if (oldData['currentLocation'] === newData['currentLocation']) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'Location hasn\'t changed');
    } else if (isPointWithinRadius([
        oldData['currentLocation'].longitude, oldData['currentLocation'].latitude],
        [oldData['homeLocation'].longitude, oldData['homeLocation'].latitude], distance)) {
        for (let group of newData['groups']) {

            // Create a notification if someone is eliminated
            group.collection('notifications').add({
                text: 'Oh no! ' + newData['name'] + ' has left their house!',
            }).then(ref => {
                console.log('Added notification with ID: ', ref.id);
            });

            // Removes user from the participating group members and adds them to those eliminated
            group.update({
                participating: FieldValue.arrayRemove(change.after.ref),
                eliminated: FieldValue.arrayUnion(change.after.ref),
            })
        }
    }
}

module.exports = checkLoss;