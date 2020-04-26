const {
    functions,
    db,
    admin,
} = require('./admin');

// These registration tokens come from the client FCM SDKs.
const registrationTokens = [
    'f_lxoxVFCULggY8WFpsU_6:APA91bGkiZ_mvNkTTPfO6kUYoUg7dV5yp7F2cgcGrXX8W9or1CjggmR7tPQjHR8eNUjtcZHO66V1qDu0tHGGdr87ey2yv__ChCZ7XF1cRVanGw7-aJlyl-e5fIdaniC-0XbNT2lXgKqp',
    // …
    //'YOUR_REGISTRATION_TOKEN_N',
];
// This registration token comes from the client FCM SDKs.

const  message = {  notification: {
        title: '$GOOG up 1.43% on the day',
        body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
    },
    tokens: registrationTokens
};



const messagingTest = (data, context) => {
// Send a message to the device corresponding to the provided
// registration token.
    admin.messaging().sendMulticast(message)
        .then((response) => {
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(registrationTokens[idx]);
                    }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
            }
        });
}

module.exports = messagingTest;