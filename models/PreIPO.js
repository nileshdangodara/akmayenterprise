const mongoose = require('mongoose');

const preIPOSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    imglink: { type: String },
    short: { type: String },
    sector: { type: String },
    price: { type: Number },
    change: { type: Number },
    gain: { type: Number },
    lot: { type: Number },
    minInv: { type: String },
    hot: { type: Boolean, default: false },
    stage: { type: String },
    desc: { type: String }
});

module.exports = mongoose.model('PreIPO', preIPOSchema);
