const {
    functions,
} = require('./admin');

const addMessage = require('./addMessage');
const addUser = require('./addUser');
const updateCurrentLocation = require('./updateCurrentLocation');
const checkLoss = require('./checkLoss');
const addGroup = require('./addGroup');
const addFriend = require('./addFriend');
const getFriends = require('./getFriends');
const updateGroupStatus = require('./updateGroupStatus');
const getGroups = require('./getGroups');
const getGroup = require('./getGroup');
const getUser = require('./getUser');
const messagingTest = require('./messagingTest');
const inviteToGroup = require('./inviteToGroup');
const getGroupLocationData = require('./getGroupLocationData');



module.exports = {
    'addMessage': functions.https.onCall(addMessage),
    'addUser': functions.https.onCall(addUser),
    'updateCurrentLocation': functions.https.onCall(updateCurrentLocation),
    'checkLoss': functions.firestore.document('users/{username}').onUpdate(checkLoss),
    'addGroup': functions.https.onCall(addGroup),
    'addFriend': functions.https.onCall(addFriend),
    'getFriends': functions.https.onCall(getFriends),
    'updateGroupStatus': functions.https.onCall(updateGroupStatus),
    'getGroups': functions.https.onCall(getGroups),
    'getGroup': functions.https.onCall(getGroup),
    'getUser': functions.https.onCall(getUser),
    'messagingTest': functions.https.onRequest(messagingTest),
    'inviteToGroup': functions.https.onCall(inviteToGroup),
    'getGroupLocationData': functions.https.onCall(getGroupLocationData),
};