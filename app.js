import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import  {PORT} from './config/env.js';
import router from './routes/routes.js';
import connectToDatabase from './Database/mongodb.js';
import errorMiddleware from './Middlewares/error.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});


app.use('/api/v1', router);

app.use(errorMiddleware)

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;