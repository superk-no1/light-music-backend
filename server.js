const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoute');
const songRoutes = require('./routes/songRoute');
const playListRoutes = require('./routes/playListRoute');

const app = express();
app.listen(3000, () => {
    console.log(`Server is running at 3000`);
    });
mongoose.connect('mongodb://localhost/light-music');

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/song', songRoutes);
app.use('/api/playList', playListRoutes);