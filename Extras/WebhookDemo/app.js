// Copyright 2019 Xsolla Inc. All Rights Reserved.
// @author Vladimir Alyamkin <ufna@ufna.ru>

const config = require('./config.json');
global.gConfig = config;

// Prepare express and logger extensions
let express = require('express');
let logger = require('morgan');

// Create in-memory only datastore
let Datastore = require('nedb');
global.db = {};
global.db.users = new Datastore();
global.db.purchases = new Datastore();

// And fill the db with test data
global.db.users.insert([{ id: "test_user_1" }, { id: "test_user_2" }], function (err, newDocs) {
    // Two users were inserted in the database
    // newDocs is an array with these documents, augmented with their _id
});

// Prepare router and launch the app
let webhookRouter = require('./routes/webhook');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/webhook', webhookRouter);

module.exports = app;