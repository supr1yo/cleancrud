import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './docs/swagger';
import routes from './routes/index';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// All routes
app.use('/', routes);

// Swagger route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => console.log(`Visit for docs: http://localhost:${PORT}/docs/`));