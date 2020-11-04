import express from 'express';
import bus from '../controllers/busContr';

const router=express.Router();

router.get('/:busPlate',bus.getBusByPlateNum);

export default router;