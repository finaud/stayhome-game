const {
    functions,
    db,
} = require('./admin');

const addMessage = require('./addMessage');

module.exports = {
    'addMessage': functions.https.onCall(addMessage),
};