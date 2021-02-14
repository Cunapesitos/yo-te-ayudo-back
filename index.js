'use strict'

require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

const host = process.env.APP_HOST || 'http://localhost';
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`App started.\nApp listening at ${host}`);
});

app.get('/', (req, res) => res.redirect('/echo'));
app.get('/echo', (req, res) => res.send("echo"));

app.post('/post', (req, res) => res.send(req.body));