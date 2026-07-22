
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createEnquiry,
  getEnquiries,
  deleteEnquiry,
} from '../controller/Enquiry.controller.js';

const router = express.Router();

router.post('/create', createEnquiry); // public - the enquiry form posts here
router.get('/all', verifyToken, getEnquiries); // admin dashboard
router.delete('/delete/:id', verifyToken, deleteEnquiry); // admin dashboard

export default router;