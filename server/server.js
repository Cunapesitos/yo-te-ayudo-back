"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var mongoose = require("mongoose");
dotenv.config();
var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || '27017';
var db_name = process.env.DB_NAME || 'yo_te_ayudo_db';
var connection_string = "mongodb://" + db_host + ":" + db_port + "/" + db_name;
var connection_config_params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
console.log("\nConnecting to db...\n");
mongoose.set('useFindAndModify', false);
mongoose.connect(connection_string, connection_config_params).then(function () {
    console.log('Connected to db.\n\nStarting app...');
    startApp();
}).catch(function (error) {
    console.log('\nError connecting to db...\n' + error);
    console.log('\nApp not started.\n\n');
});
function startApp() {
    try {
        import app = require('./app');
        var app_port = process.env.PORT || 3000;
        var app_host_1 = process.env.APP_HOST || 'localhost';
        app.listen(app_port, function () {
            console.log("App started.\nApp listening at http://" + app_host_1);
        });
    }
    catch (error) {
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
