import express, {Application, ErrorRequestHandler, NextFunction, Request, Response} from 'express';
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
import RoleRoutes from './routers/RoleRoutes';
// utilities:
import { CorsConfig } from './constant/CorsConfig';
import { errorHandlerMiddleware } from './utils/ErrorHandler';

class App {
    public app: Application;
    private apiVersioning: string = "/api/v1";
    constructor(){
        this.app = express();
        this.plugins();
        dotenv();
        this.routes();
    }

    protected plugins():void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(morgan('dev'));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors(CorsConfig));
    }

    protected routes():void {
        this.app.route('/').get((req:Request, res: Response)=> {
            res.send('wellcome to tuya wrapper API - Smart Lab');
        })
        
        this.app.use(this.apiVersioning +'/users', UserRoutes);
        this.app.use(this.apiVersioning + '/auth', AuthRoutes)
        this.app.use(this.apiVersioning +'/device', DeviceRouter);
        this.app.use(this.apiVersioning +'/role', RoleRoutes);
        // error handler
        this.app.use(errorHandlerMiddleware)
    }   
}

const app = new App().app;

app.listen(process.env.PORT, ()=>{
    console.log('this app is running on port ' + process.env.PORT);
}); 