import express from 'express';
import { CheckoutstoreData, Lastsevendays, Livecheckin, storeData } from '../controllers/Qrcode.js';

const router = express.Router();

router.post('/', storeData);
router.post('/checkout',CheckoutstoreData)
router.get('/livedata',Livecheckin)
router.get('/days',Lastsevendays)

export default router;
