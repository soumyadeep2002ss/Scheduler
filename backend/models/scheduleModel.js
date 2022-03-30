const mongoose = require('mongoose');

const schelduleSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true,
        unique: true
    },
}
);

module.exports = mongoose.model('Schedules', schelduleSchema);