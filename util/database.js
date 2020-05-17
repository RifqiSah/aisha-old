// Database Configuration
const config = require('../config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Cek apakah envnya ada atau tidak
if (!config.MONGODB) {
    console.log('[X] DB configuration error!');
    process.exit();
}

// Connect
mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log(`[V] Connected with database!`);    
}).catch(err => {
    console.log(`[X] Database error with: ${err}!`);
    process.exit();
});