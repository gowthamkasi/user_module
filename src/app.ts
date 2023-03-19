import { config } from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from '../src/components/user/route';
import db from './connections/db';

config();

const app = express();

const expressErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status).send(err.message);
};

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req['rawBody'] = buf;
    },
  })
);

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);

app.use('/', (req, res) => {
  console.log('Inside 404 Error Route');
  res.status(404).send('404 Page Not Found!');
});

// Express Error Handler
app.use(expressErrorHandler);

if (process.env.NODE_ENV !== 'test') {
  db.sync({ alter: true }).then(() => {
    console.log('Database Connected');

    const port = parseInt(process.env.PORT!);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
}

export default app;
