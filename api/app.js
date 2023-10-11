import express from 'express';
import swaggerUi from'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: "json"};;
import bodyParser from'body-parser';
import cors from 'cors';
import * as dotenv from "dotenv" ;
dotenv.config();
import {verifyToken} from './middlewares/auth.js';

// routes import
import user_routes from './routes/userRoutes.js';
import diagnose_routs from './routes/diagnoseRoutes.js';


// db connection
import db from './db_connection.js';


// express app
const app = express();


// app env vars
const { API_PORT } = process.env;

app.get('/',(req,res) => {
    res.send('Doctors and Patients APIs');
})

// set port
const PORT = process.env.PORT || API_PORT;
app.set('port', PORT);

// set variables & middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


// routes
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', user_routes);
app.use('/diagnose', verifyToken, diagnose_routs);


const server = app.listen(PORT,() => {
    console.log(`Running on PORT ${PORT}`);
})
