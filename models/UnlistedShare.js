const mongoose = require('mongoose');

const unlistedShareSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true }, // 'hdb-financial'
    name: { type: String, required: true }, // 'HDB Financial Services'
    imglink: { type: String },
    short: { type: String }, // 'HDB'
    sector: { type: String }, // 'Finance'
    price: { type: Number }, // 1250
    high52: { type: Number }, // 1420
    low52: { type: Number }, // 920
    change: { type: Number }, // 26.63
    mcap: { type: String }, // '₹1.05L Cr'
    isin: { type: String }, // 'INE756I01012'
    lot: { type: Number }, // 100
    featured: { type: Boolean, default: false }, // true
    desc: { type: String }, // 'HDFC Bank\'s NBFC arm awaiting SEBI-mandated listing.'
    pan: { type: String },
    cin: { type: String },
    depository: { type: String },
    rta: { type: String },
    faceValue: { type: Number },
    pe: { type: String },
    pb: { type: String },
    roe: { type: String },
    d2e: { type: String },
    bookValue: { type: String },
    totalShares: { type: String },
    about: [{ type: String }],
    products: { type: String },
    quarterly: [{
        q: String,
        rev: Number,
        ebitda: Number,
        pat: Number
    }],
    yearly: [{
        y: String,
        rev: Number,
        ebitda: Number,
        pat: Number
    }],
    faqs: [{
        q: String,
        a: String
    }]
});

module.exports = mongoose.model('UnlistedShare', unlistedShareSchema);
