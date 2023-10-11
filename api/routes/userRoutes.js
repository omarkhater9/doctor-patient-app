import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get(
    '/allDoctors',
    verifyToken,
    userController.getAllDoctors
)
router.get(
    '/allPatients',
    verifyToken,
    userController.getAllPatients
)
router.get(
    '/:id',
    verifyToken,
    userController.getUserById
)
router.post(
    '/registerUser',
    userController.registerUser
)
router.put(
    '/updatePatientData',
    verifyToken,
    userController.updatePatientData
)
router.post(
    '/login',
    userController.login
)

export default router;