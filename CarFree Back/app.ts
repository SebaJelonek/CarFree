import express from 'express';
import cors from 'cors';
import mongoConnect from './mongoConnect';
import UserRouter from './Router/UserRouter';
import CarRouter from './Router/CarRouter';

const app = express();
mongoConnect();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(UserRouter);
app.use(CarRouter);

app.listen(1337 || process.env.PORT);

export const viteNodeApp = app;
