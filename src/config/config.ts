export default class Config {
    PRODUCTION = process.env.PRODUCTION === 'true' || false;
    SERVER = {
        HOST: process.env.HOST || 'http://localhost',
        PORT: process.env.PORT || 3000,
        URL: '',
        SECRET_SALT_OR_ROUNDS_COUNT: process.env.SECRET_SALT_OR_ROUNDS_COUNT || 1
    }
    MONGO_DB = {
        USERNAME: process.env.MONGO_USERNAME || 'mongo_username',
        PASSWORD: process.env.MONGO_PASSWORD || 'mongo_password',
        HOST: process.env.MONGO_HOST || `mongo_host`,
        PORT: process.env.MONGO_PORT || `mongo_port`,
        NAME: process.env.MONGO_NAME || 'mongo_name',
        CONNECTION_STRING: '',
        OPTIONS: {
            /* useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            poolSize: 50,
            autoIndex: true,
            retryWrites: false */
            useNewUrlParser: true
        }
    }


    constructor() {
        this.MONGO_DB.CONNECTION_STRING =
            `mongodb+srv://${this.MONGO_DB.USERNAME}:${this.MONGO_DB.PASSWORD}@${this.MONGO_DB.HOST}/${this.MONGO_DB.NAME}?retryWrites=true&w=majority`;

        this.SERVER.URL =
            `${this.SERVER.HOST}`;
        if (this.PRODUCTION === false) {
            this.SERVER.URL += `:${this.SERVER.PORT}`
        }
    }
}
