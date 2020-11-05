import express from 'express';
import welcome from '../controllers/user';
import userController from '../controllers/userController';
import swagger from '../swagger/index';

const router = express.Router();

router.get('/', welcome);

/**
 * @swagger
* /:
*   get:
*     tags:
*       - Welcome Route
*     description: Display welcome message
*     produces:
*       - application/json
*     responses:
*       200:
*         description:Welcome to phantom, a platform to facilitate the transportation mode in town!.
*/
router.post('/api/auth/login', userController.login);

router.use('/api-docs', swagger);

export default router;