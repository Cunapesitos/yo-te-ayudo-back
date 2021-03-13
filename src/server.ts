import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import userRouter from './user/UserRoutes';

export default class Server {
    public app: Application = express();

    constructor(private port: number) {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // CORS
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(express.static('public'));
        this.app.get('/', (req: Request, res: Response) => res.redirect('/echo'));
        this.app.get('/echo', (req: Request, res: Response) => res.send("echo"));
        this.app.post('/echo', (req: Request, res: Response) => res.send(req.body));
        this.app.use('/api', userRouter);
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }

    static init(port: number): Server {
        return new Server(port);
    }


}