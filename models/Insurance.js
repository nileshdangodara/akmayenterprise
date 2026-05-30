const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imglink: { type: String },
    insurer: { type: String },
    type: { type: String }, // 'Term', 'Health', etc.
    cover: { type: String },
    coverNum: { type: Number },
    premium: { type: String },
    premiumNum: { type: Number },
    claim: { type: String },
    tag: { type: String }, // 'chip-term'
    hot: { type: Boolean, default: false },
    desc: { type: String },
    features: [{ type: String }]
});

module.exports = mongoose.model('Insurance', insuranceSchema);
