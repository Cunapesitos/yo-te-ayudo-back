'use strict'

require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const host = process.env.APP_HOST || 'http://localhost';
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`App started.\nApp listening at ${host}`);
});

var user_routes = require('./components/user/UserRoutes');

app.get('/', (req, res) => res.redirect('/echo'));
app.get('/echo', (req, res) => res.send("echo"));
app.post('/post', (req, res) => res.send(req.body));

app.use('/api', user_routes);


module.exports = app;