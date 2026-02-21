import 'dotenv/config';
import mongoose from 'mongoose';
import Scheme from '../models/Scheme.js';
import User from '../models/User.js';

const sampleSchemes = [
  {
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    description: 'Central Sector Scheme to provide income support to all landholding farmer families.',
    eligibilityCriteria: 'Small and marginal farmer families with combined landholding up to 2 hectares.',
    benefits: 'Rs 6,000 per year in three equal installments of Rs 2,000 every four months.',
    applyLink: 'https://pmkisan.gov.in',
    category: 'Income Support',
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'Crop insurance scheme to protect farmers against crop loss due to natural calamities.',
    eligibilityCriteria: 'All farmers growing notified crops in notified areas.',
    benefits: 'Premium subsidy; claim settlement for crop loss due to natural calamities, pests, diseases.',
    applyLink: 'https://pmfby.gov.in',
    category: 'Insurance',
  },
  {
    name: 'Kisan Credit Card (KCC)',
    description: 'Credit scheme for farmers for purchase of inputs and other short-term needs.',
    eligibilityCriteria: 'Individual farmers, tenant farmers, oral lessees, sharecroppers.',
    benefits: 'Short-term credit at subsidized interest; flexibility in withdrawal and repayment.',
    applyLink: 'https://www.nabard.org',
    category: 'Credit',
  },
  {
    name: 'Soil Health Card Scheme',
    description: 'Scheme to help farmers understand soil nutrient status and get recommendation for fertilizers.',
    eligibilityCriteria: 'All farmers with landholding.',
    benefits: 'Free soil testing every 2 years; crop-wise recommendations for nutrients and fertilizers.',
    applyLink: 'https://soilhealth.dac.gov.in',
    category: 'Soil & Input',
  },
  {
    name: 'National Mission on Oilseeds and Oil Palm (NMOOP)',
    description: 'Increase production of oilseeds and oil palm to reduce import dependency.',
    eligibilityCriteria: 'Farmers in identified districts for oilseeds and oil palm.',
    benefits: 'Subsidy on seeds, mini kits, and area expansion under oil palm.',
    applyLink: 'https://agriculture.gov.in',
    category: 'Crop Support',
  },
  {
    name: 'Rashtriya Krishi Vikas Yojana (RKVY)',
    description: 'Incentivize states to increase investment in agriculture and allied sectors.',
    eligibilityCriteria: 'State governments; benefits reach farmers through state schemes.',
    benefits: 'Flexible funding for agriculture projects; infrastructure and innovation support.',
    applyLink: 'https://rkvy.nic.in',
    category: 'State Support',
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Scheme.deleteMany({});
  await Scheme.insertMany(sampleSchemes);
  const adminExists = await User.findOne({ email: 'admin@farmer.com' });
  if (!adminExists) {
    await User.create({
      name: 'Admin',
      email: 'admin@farmer.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Admin user created: admin@farmer.com / admin123');
  }
  const userExists = await User.findOne({ email: 'user@farmer.com' });
  if (!userExists) {
    await User.create({
      name: 'Test User',
      email: 'user@farmer.com',
      password: 'user123',
      role: 'user',
    });
    console.log('Test user created: user@farmer.com / user123');
  }
  console.log('Seeded', sampleSchemes.length, 'schemes.');
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
