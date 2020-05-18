// Database Configuration
const mongoose = require('mongoose');
const config = require('../config.js');

mongoose.Promise = global.Promise;

// Cek apakah envnya ada atau tidak
if (!config.MONGODB) {
    console.log('[X] DB configuration error!');
    process.exit();
}

// Connect
module.exports = {
    connect() {
        // eslint-disable-next-line max-len
        mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => {
                console.log('[V] Database connected!');
            }).catch((err) => {
                console.log(`[X] Database error with: ${err}!`);
                process.exit();
            });
    },
};
