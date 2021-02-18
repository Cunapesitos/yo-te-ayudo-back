'use strict'

class Controller {

    send = (res, code, msg, body) => {
        return res.status(code).json({
            message: msg,
            body: body
        });
    }
}

module.exports = Controller;