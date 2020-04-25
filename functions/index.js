const {
    functions,
    db,
} = require('./admin');

const addMessage = require('./addMessage');
const addUser = require('./addUser');
const addGroup = require('./addGroup');

module.exports = {
    'addMessage': functions.https.onCall(addMessage),
    'addUser': functions.https.onCall(addUser),
    'addGroup': functions.https.onCall(addGroup),
};