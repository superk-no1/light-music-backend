const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/route');

const app = express();
app.listen(3000, () => console.log('Server running on port 3000'));

mongoose.connect('mongodb://localhost/light-music');

app.use(express.json());
app.use('/api/user', userRoutes);