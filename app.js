require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./db/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Define routes
app.use('/', require('./routes/index'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use(express.static(path.join(__dirname, 'resource'), {
    maxAge: '30d'
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
