import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';

// routes:
import UserRoutes from './routers/UserRouter';
import DeviceRouter from './routers/DeviceRouter';
import AuthRoutes from './routers/AuthRoutes';

class App {
    public app: Application;
    private apiVersioning: string = "/api/v1";
    constructor(){
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins():void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(
            cors({
                origin: [
                  'https://openapi.tuyaus.com',
                  'http://localhost:8000',
                ],
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], 
                allowedHeaders: [
                  'Origin',
                  'X-Requested-With',
                  'Content-Type',
                  'Accept',
                  'Signature-Headers',
                  'client_id',
                  'access_token',
                  'sign',
                  'sign_method',
                  'stringToSign',
                  't',
                  'nonce',
                ], 
              })
        )
    }

    protected routes():void {
        this.app.route('/').get((req:Request, res: Response)=> {
            res.send('wellcome to tuya wrapper API - Smart Lab');
        })

        this.app.use(this.apiVersioning +'/users', UserRoutes);
        this.app.use(this.apiVersioning +'/device', DeviceRouter);
        this.app.use(this.apiVersioning + '/auth', AuthRoutes)
    }   
}

const app = new App().app;

app.listen(process.env.PORT, ()=>{
    console.log('this app is running on port ' + process.env.PORT);
}); 