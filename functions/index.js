const {
    functions,
} = require('./admin');

const addMessage = require('./addMessage');
const addUser = require('./addUser');
const addGroup = require('./addGroup');
const addFriend = require('./addFriend');

module.exports = {
    'addMessage': functions.https.onCall(addMessage),
    'addUser': functions.https.onCall(addUser),
    'addGroup': functions.https.onCall(addGroup),
    'addFriend': functions.https.onCall(addFriend),
};