import User from '../models/User.js';
import Scheme from '../models/Scheme.js';
import PredictionLog from '../models/PredictionLog.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch users.' });
  }
};

export const getStats = async (req, res) => {
  try {
    const [userCount, schemeCount, predictionCount] = await Promise.all([
      User.countDocuments(),
      Scheme.countDocuments(),
      PredictionLog.countDocuments(),
    ]);

    const predictionsByType = await PredictionLog.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    res.json({
      userCount,
      schemeCount,
      predictionCount,
      predictionsByType: predictionsByType.reduce((acc, { _id, count }) => ({ ...acc, [_id]: count }), {}),
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch stats.' });
  }
};

export const getPredictionLogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(5, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      PredictionLog.find()
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PredictionLog.countDocuments(),
    ]);

    res.json({
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch prediction logs.' });
  }
};
