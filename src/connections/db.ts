import { Sequelize } from 'sequelize-typescript';
import user from '../components/user/user.model';

import { config } from 'dotenv';

config();

const _database: string = process.env.DB_NAME!;
const _username: string = process.env.DB_USERNAME!;
const _password: string = process.env.DB_PASSWORD!;
const _host: string = process.env.DB_HOST!;
const _port: string = process.env.DB_PORT!;

const db = new Sequelize({
  database: _database,
  dialect: 'postgres',
  username: _username,
  password: _password,
  host: _host,
  port: Number(_port),
  storage: ':memory:',
  logging: (msg) => console.log(msg),
  models: [user],
  define: {
    freezeTableName: true,
  },
  retry: {
    max: Infinity,
    match: [
      /ConnectionError/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
      /SequelizeConnectionAcquireTimeoutError/,
      /Connection terminated unexpectedly/,
    ],
  },
});

export default db;
