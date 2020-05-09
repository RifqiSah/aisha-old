const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    id: {
        type: String,
        required: true,
    }
});

const Channel = mongoose.model("channel", channelSchema);
module.exports = Channel;