const {
    functions,
    db,
    admin,
} = require('./admin');

const updateCurrentLocation = (data, context) => {

    const username = data.username;
    const lon = parseFloat(data.lon);
    const lat = parseFloat(data.lat);

    return db.collection('users').doc(username).update({
        currentLocation: new admin.firestore.GeoPoint(lat, lon)
    }).then(() => {
        console.log('Location updated for ' + username);
        // Returning the sanitized message to the client.
        return { msg: "success" };
    })

        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = updateCurrentLocation;