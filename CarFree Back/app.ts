import express from 'express';
import cors from 'cors';
import mongoConnect from './mongoConnect';
import CarRouter from './Router/CarRouter';

const app = express();
mongoConnect();

app.get('/', async (req, res) => {
  res.send('fuck off');
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(CarRouter);

app.listen(1337 || process.env.PORT);

export const viteNodeApp = app;
