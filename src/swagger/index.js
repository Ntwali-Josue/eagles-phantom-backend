import swaggerJSDoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

import os from 'os';

import pkg from 'express';
import dotenv from 'dotenv';

dotenv.config();

const Router = pkg;

const router = Router();

const swaggerDefinition = {
  definition: {
    info: {
      title: 'Phantom',
      version: '1.0.0',
      description:
            'We facilitate the transport of our client',
    },

    servers: [{
      url: 'http://localhost:3020',
      name: `${os.hostname()}`,
    },
    {
      url: 'https://phantom-eagles-backend.herokuapp.com',
      name: `${os.hostname()}`,
    },
    ],
  },
  apis: ['./src/routers/*.js'],
};

const swaggerDocument = swaggerJSDoc(swaggerDefinition);

router.use('/', swaggerui.serve, swaggerui.setup(swaggerDocument));



export default router;

