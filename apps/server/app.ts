import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import auth from './src/routes/auth';
import api from './src/routes/api';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth);
app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}`));
