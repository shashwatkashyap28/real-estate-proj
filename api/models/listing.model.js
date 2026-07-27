import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },

    // --- Detail-page fields added for CreateListing / UpdateListing ---
    propertyType: {
      type: String,
      default: 'High Rise',
    },
    status: {
      type: String,
      default: 'Ready to Move',
    },
    possessionYear: {
      type: String,
      default: '',
    },
    paymentPlan: {
      type: String,
      default: '',
    },
    masterPlanImage: {
      type: String,
      default: '',
    },
    sitePlanImage: {
      type: String,
      default: '',
    },
    nearby: {
      type: [String],
      default: [],
    },
    specifications: {
      type: [String],
      default: [],
    },
    builder: {
      name: { type: String, default: '' },
      logo: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    youtubeLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;