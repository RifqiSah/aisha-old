const mongoose = require('mongoose');

const { Schema } = mongoose;

const configSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Schema.Types.Mixed,
        required: true,
    },
});

const Config = mongoose.model('config', configSchema);
module.exports = Config;
