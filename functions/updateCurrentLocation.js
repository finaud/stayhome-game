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
        return { msg: "success" };
    })

        .catch((error) => {
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
}

module.exports = updateCurrentLocation;