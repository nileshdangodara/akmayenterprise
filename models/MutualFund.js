const mongoose = require('mongoose');

const mutualFundSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    imglink: { type: String },
    amc: { type: String, required: true },
    cat: { type: String, required: true },
    subCat: { type: String, required: true },
    risk: { type: String, required: true },
    rating: { type: Number, required: true },
    nav: { type: String, required: true },
    ret1y: { type: Number, required: true },
    ret3y: { type: Number, required: true },
    ret5y: { type: Number, required: true },
    minSip: { type: String, required: true },
    aum: { type: String, required: true },
    exp: { type: String, required: true },
    exit: { type: String, required: true },
    mgr: { type: String, required: true },
    desc: { type: String, required: true },
    holdings: [{ type: String }],
    star: { type: Boolean, default: false }
});

module.exports = mongoose.model('MutualFund', mutualFundSchema);
