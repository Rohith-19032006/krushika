import User from '../models/User.js';

const DEFAULT_USERS = [
  { name: 'Admin', email: 'admin@farmer.com', password: 'admin123', role: 'admin' },
  { name: 'Test User', email: 'user@farmer.com', password: 'user123', role: 'user' },
];

export default async function ensureDefaultUsers() {
  for (const u of DEFAULT_USERS) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      await User.create(u);
      console.log(`Created default ${u.role}: ${u.email}`);
    }
  }
}
