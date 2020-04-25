const {
    functions,
    db,
} = require('./admin');

const addMessage = require('./addMessage');
const addUser = require('./addUser');

module.exports = {
    'addMessage': functions.https.onCall(addMessage),
    'addUser': functions.https.onCall(addUser),
};