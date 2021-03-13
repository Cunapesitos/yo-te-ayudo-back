import { Application, Request, Response, NextFunction } from 'express';
import Validator from 'ts-model-validators';
import Controller = require('../base/Controller');
import { User, IUserModel } from './UserModel';

class UserController extends Controller {

    create = (req: Request, res: Response) => {
        const request = req.body;
        const user = new User(request);
        user
            .save()
            .then(() => {
                return this.send(res, 200, "User registered", user);
            })
            .catch(err => {
                return this.send(res, 500, err.message, err);
            });
    }

    readOne = (req: Request, res: Response) => {
        const id = req.params.id;
        User.findById(id, (err: any, doc: IUserModel) => {
            if (err) {
                return this.send(res, 500, err.message, err);
            }
            return this.send(res, 200, "User found", doc);
        });
    }

    update = (req: Request, res: Response) => {
        return res.send("OK");
    }

    login = (req: Request, res: Response) => {
        const body = req.body;
        User.findOne({ email: body.email }, async (err: any, doc: IUserModel) => {
            if (err || doc == null) {
                return this.send(res, 401, "User not found", err);
            }
            if (!await doc.isValidPassword(body.password)) {
                return this.send(res, 401, "Incorrect pasword", doc);
            }
            return this.send(res, 200, "Login ok", doc);
        });
    }
}

export = new UserController();