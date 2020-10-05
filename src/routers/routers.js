import express from 'express';
import validRole from '../validations/validRole';
import users from '../controllers/users';
import checkUser from '../middleware/checkUser';
import isAdmin from '../middleware/isAdmin';

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     description: Display all Phantom Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       200:
 *         description: These are registered Phantom users
 * */
router.get('/', checkUser, isAdmin,users.getUsers);
/** 
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     description: Get user by Id
 *     parameters:
 *          - name: userId
 *            description: id of user to get by
 *            in: path
 *            type: integer
 *            required: true
 *          - name: x-access-token
 *            in: header
 *            description: jwt token of the user
 *     responses:
 *       200:
 *         description: user successfully found
 *       401:
 *         description: you don't permissions
 * */
router.get('/:userId',checkUser, isAdmin,users.getUserbyId);
/** 
 * @swagger
 * /api/v1/users/{userId}:
 *   patch:
 *     description: Update user by Id
 *     parameters:
 *          - name: userId
 *            description: id of user to update by
 *            in: path
 *            type: integer
 *            required: true
 *          - name: x-access-token
 *            in: header
 *            description: jwt token of the user
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  role:
 *                      type: string
 *                required:
 *                  - role
 *     responses:
 *       200:
 *         description: User role created
 *       401:
 *         description: you don't permissions
 *       400:
 *         descriptuion: Bad request
 * */
router.patch('/:userId',checkUser, isAdmin,validRole,users.updateUser);
// router.get('/?lang=fr', translator);
export default router;
