const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  agencyName: {
    type: String,
    default: 'IMPACTRA'
  },
  tagline: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  instagram: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  behance: {
    type: String,
    trim: true
  },
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true
  },
  logoUrl: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Setting', SettingSchema);
