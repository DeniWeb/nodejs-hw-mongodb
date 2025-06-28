import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.set('json spaces', 2);

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Mongo connection successfully established!',
      availableEndpoints: {
        GET: [
          { path: '/contacts', description: 'Get all contacts' },
          { path: '/contacts/:contactId', description: 'Get contact by ID' },
        ],
        POST: [
          {
            path: '/contacts',
            description: 'Create new contact (name, email, phone)',
          },
        ],
        PUT: [
          {
            path: '/contacts/:contactId',
            description: 'Replace entire contact by ID',
          },
        ],
        PATCH: [
          {
            path: '/contacts/:contactId',
            description: 'Partially update contact by ID',
          },
        ],
        DELETE: [
          { path: '/contacts/:contactId', description: 'Delete contact by ID' },
        ],
      },
    });
  });

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
