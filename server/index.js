const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./router');
const mongoose = require('./models/db');

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 3000;

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('🎉 Connected to Database! 🎉'));

app.listen(PORT, () => {
  console.log(`🎪 Server running at: http://localhost:${PORT} 🎪`);
});