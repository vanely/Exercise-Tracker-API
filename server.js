const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------------------------------------
// connect to mongo atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// establish connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to MongoDB!');
});

// -------------------------------------------------------------------------------------------
// connection to routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// -------------------------------------------------------------------------------------------
// serve
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
