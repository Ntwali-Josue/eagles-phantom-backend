import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '../utils/swaggerOptions';

import welcomeRoute from './welcome.route';
import userRoute from './users.routes';
import busRoute from './bus.routers';

const swaggerDoc = swaggerJsdoc(swaggerOptions);
const router = Router();

router.use(welcomeRoute);

router.use('/api/v1/auth', userRoute);
router.use('/api/v1/', busRoute);

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

export default router;
