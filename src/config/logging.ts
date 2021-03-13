const log = (message: string) => {
    if (!process.env.PRODUCTION) {
        // tslint:disable-next-line:no-console
        console.log(message);
    }
};

const info = (message: string) => {
    // tslint:disable-next-line:no-console
    console.info(message);
};

const error = (message: string) => {
    // tslint:disable-next-line:no-console
    console.error(message);
};

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const activity = {
    log,
    info,
    error
}

export default activity;