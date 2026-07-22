import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    interest: {
      type: String,
      enum: ['Buy', 'Rent', 'Sell', 'Just browsing'],
      default: 'Buy',
    },
    message: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;