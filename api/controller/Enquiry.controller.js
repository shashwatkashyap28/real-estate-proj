import Enquiry from '../models/enquiry.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// POST /api/enquiry/create (public - hit by the enquiry form)
export const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    if (!name || !email) {
      return next(errorHandler(400, 'Name and email are required'));
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      interest,
      message,
    });

    return res.status(201).json(enquiry);
  } catch (error) {
    next(error);
  }
};

// GET /api/enquiry/all (admin only - feeds the dashboard)
export const getEnquiries = async (req, res, next) => {
  try {
    // 1. Check token first
    let isAdmin = req.user?.isAdmin;

    // 2. If token lacks isAdmin, check Database directly
    if (!isAdmin && req.user?.id) {
      const dbUser = await User.findById(req.user.id);
      isAdmin = dbUser?.isAdmin;
    }

    if (!isAdmin) {
      return next(errorHandler(403, 'You are not allowed to view enquiries'));
    }

    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(enquiries);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/enquiry/delete/:id (admin only)
export const deleteEnquiry = async (req, res, next) => {
  try {
    let isAdmin = req.user?.isAdmin;

    if (!isAdmin && req.user?.id) {
      const dbUser = await User.findById(req.user.id);
      isAdmin = dbUser?.isAdmin;
    }

    if (!isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this enquiry'));
    }

    await Enquiry.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Enquiry has been deleted' });
  } catch (error) {
    next(error);
  }
};