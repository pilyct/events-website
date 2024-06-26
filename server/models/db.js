const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URL);

module.exports = mongoose;