const mongoose = require('mongoose');

const { Schema } = mongoose;

const channelSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
});

const Channel = mongoose.model('channel', channelSchema);
module.exports = Channel;
