import express = require('express');
import dotenv = require('dotenv');
import mongoose = require('mongoose');

var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || '27017';
var db_name = process.env.DB_NAME || 'yo_te_ayudo_db';
var connection_string = `mongodb://${db_host}:${db_port}/${db_name}`;
var connection_config_params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

console.log("Connecting to db...");

mongoose.set('useFindAndModify', false);
mongoose.connect(
    connection_string,
    connection_config_params
).then(() => {
    console.log('Connected to db.\nStarting app...');
    startApp();
}).catch(error => {
    console.log('Error connecting to db...\n' + error);
});

function startApp() {
    try {
        var app = require('./app');
        const app_port = process.env.PORT || 3000;
        const app_host = process.env.APP_HOST || 'localhost';

        app.listen(app_port, () => {
            console.log(`App started.\nApp listening at http://${app_host}`);
        });
    } catch (error) {
        console.log('Error starting app...\n' + error);
    }
}

/*const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hi from ');
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});*/