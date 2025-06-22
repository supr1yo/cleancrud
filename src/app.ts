import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import routes from './routes/index';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));