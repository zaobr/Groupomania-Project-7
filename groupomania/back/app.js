const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('sequelize');
const Associations = require('./models/association')();
const app = express();

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const interactionRoutes = require('./routes/interactions');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors()); 

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/interaction', interactionRoutes);

module.exports = app;