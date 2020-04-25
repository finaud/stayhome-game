const {
    functions,
} = require('./admin');

const addMessage = require('./addMessage');
const addUser = require('./addUser');
const addGroup = require('./addGroup');
const addFriend = require('./addFriend');
const getFriends = require('./getFriends');
const updateGroupStatus = require('./updateGroupStatus');



module.exports = {
    'addMessage': functions.https.onCall(addMessage),
    'addUser': functions.https.onCall(addUser),
    'addGroup': functions.https.onCall(addGroup),
    'addFriend': functions.https.onCall(addFriend),
    'getFriends': functions.https.onCall(getFriends),
    'updateGroupStatus': functions.https.onCall(updateGroupStatus),
};