const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        const conn = await mongoose.connect(uri, { dbName: 'AKMAY_ENTERPRISE_LLP' });
        console.log(`MongoDB Connected: ${conn.connection.host}, Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
