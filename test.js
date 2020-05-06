const DB = require('./util/database.js');
const Channel = require('./models/channel.js');

Channel.create({
    id: '1234567890',
    status: true,
});