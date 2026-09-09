import express from 'express';
import {
  deleteUser,
  test,
  updateUser,
  getUserListings,
  getUser,
  getUsers,
} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.get('/test', test);

// MUST be declared before '/:id'
router.get('/all', verifyToken, verifyAdmin, getUsers);

// Public landlord profile info
router.get('/:id', getUser);

// Authenticated operations
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);

export default router;