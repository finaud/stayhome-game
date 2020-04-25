const {
    functions,
    db,
} = require('./admin');

const addMessage = require('./addMessage');
const addUser = require('./addUser');
const updateCurrentLocation = require('./updateCurrentLocation');
// const checkLoss = require('./checkLoss');

const testingAntoine = require('./testingAntoine');

module.exports = {
    'addMessage': functions.https.onCall(addMessage),
    'addUser': functions.https.onCall(addUser),
    'updateCurrentLocation': functions.https.onCall(updateCurrentLocation),
    // 'checkLoss': functions.firestore.document('users/{username}').onUpdate(checkLoss),

    'testingAntoine': functions.https.onRequest(testingAntoine),
};