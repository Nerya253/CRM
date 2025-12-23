import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { main } from './db/db_connection.js';
import { clientRouter } from './routers/Clients_R.js';
import { userRouter } from './routers/users_R.js';

const port = process.env.PORT || 4000;
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/clients', clientRouter);
app.use('/users', userRouter);

await main();

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
