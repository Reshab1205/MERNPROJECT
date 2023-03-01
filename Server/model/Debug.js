const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const DebugSchema = new mongoose.Schema({
    code: { type: Number, default: 0 },
    type: { type: String},
    route_name: { type: String},
    debug_details: { type: String},
    active: { type: Boolean, default: true },
	generic_date: { type: Date, default: new Date().toISOString() }
});

DebugSchema.plugin(timestamps);

module.exports = mongoose.model('Debug', DebugSchema);