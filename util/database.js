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
mongoose.connect(config.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("[V] Connected with database!");    
}).catch(err => {
    console.log('[X] Database not found or not exists!');
    process.exit();
});