const mongoose = require('mongoose');

const fixedDepositSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imglink: { type: String },
    type: { type: String }, // 'NBFC', 'Housing Finance', etc.
    rate: { type: Number }, // 8.85
    seniorRate: { type: Number }, // 9.10
    ratingLabel: { type: String }, // 'AAA'
    ratingClass: { type: String }, // 'safe-aaa'
    tenure: { type: String }, // '12–60M'
    minInv: { type: String }, // '₹15,000'
    top: { type: Boolean, default: false },
    desc: { type: String },
    payout: [{ type: String }] // ['Cumulative', 'Monthly', 'Quarterly', 'Annual']
});

module.exports = mongoose.model('FixedDeposit', fixedDepositSchema);
