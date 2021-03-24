require('dotenv').config();
import express from 'express';
import bodyParser from "body-parser";
import {routes} from "./routes";

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.listen(port);
