import express from 'express';
import route from '../controllers/routes';
import checkUser from '../middleware/checkUser';
import restrictTo from '../middleware/isAuthorized';
import  { routesVal,updRoutesVal } from '../validations/routesVal';

const router = express.Router();

/**
 * @swagger
 * /api/v1/routes:
 *   get:
 *     description: Display all routes
 *     tags:
 *       - Routes
 *     summary: Get All routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       200:
 *         description: These are registered Phantom routes
 * */
router.get('/',checkUser,restrictTo('admin','operator'),route.getRoutes);

/** 
 * @swagger
 * /api/v1/routes:
 *   post:
 *     description: add routes
 *     tags:
 *       - Routes
 *     summary: Create route
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  origin:
 *                      type: string
 *                  price:
 *                      type: integer
 *                  destination:
 *                       type: string
 *                required:
 *                  - origin
 *                  - price
 *                  - destination
 *     responses:
 *       200:
 *         description: route role created
 *       401:
 *         description: you don't permissions
 *       400:
 *         descriptuion: Bad request
 * */
router.post('/',checkUser,restrictTo('admin','operator'),routesVal,route.createRoutes);

/** 
 * @swagger
 * /api/v1/routes/{routeId}:
 *   get:
 *     description: Get route by Id
 *     tags:
 *       - Routes
 *     summary: Get Route by id
 *     parameters:
 *          - name: routeId
 *            description: id of route to get by
 *            in: path
 *            type: integer
 *            required: true
 *          - name: x-access-token
 *            in: header
 *            description: jwt token of the user
 *     responses:
 *       200:
 *         description: route successfully found
 *       401:
 *         description: you don't permissions
 * */
router.get('/:routeId',checkUser,restrictTo('admin','operator'),route.getOneRoute);

/** 
 * @swagger
 * /api/v1/routes/{routeId}:
 *   patch:
 *     description: Update route by Id
 *     tags:
 *       - Routes
 *     summary: Update route
 *     parameters:
 *          - name: routeId
 *            description: id of route to update by
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
 *                  origin:
 *                      type: string
 *                  price:
 *                      type: integer
 *                  destination:
 *                       type: string
 *                required:
 *                  - origin
 *                  - price
 *                  - destination
 *     responses:
 *       200:
 *         description: User role created
 *       401:
 *         description: you don't permissions
 *       400:
 *         descriptuion: Bad request
 * */
router.patch('/:routeId',checkUser,restrictTo('admin','operator'),updRoutesVal,route.updateRoute);

/**
 * @swagger
 * /api/v1/routes/{routeId}:
 *   delete:
 *     name: Delete Routes
 *     tags:
 *       - Routes
 *     summary: Delete route
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: routeId
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         description: id of the Route
 *       - name: x-access-token
 *         in: header
 *         description: jwt token of the user
 *     responses:
 *       '200':
 *             description: Route deleted successfull.
 *       '403':
 *             description: The Route you're trying to delete doesn't exist in the system.
 * */
router.delete('/:routeId',checkUser,restrictTo('admin','operator'),route.deleteRoute);



export default router;
