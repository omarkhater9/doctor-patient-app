import express from 'express';
import * as diagnoseController from '../controllers/diagnoseController.js';

const router = express.Router();

router.get(
    '/all',
    diagnoseController.getDiagnoses
)
router.post(
    '/postdiagnose',
    diagnoseController.postDiagnose
)

export default router;