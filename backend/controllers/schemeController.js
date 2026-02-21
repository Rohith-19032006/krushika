import Scheme from '../models/Scheme.js';

export const getAllSchemes = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(5, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;
    const search = (req.query.search || '').trim();
    const filter = req.query.filter ? { category: req.query.filter } : {};

    const query = { ...filter };
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const [schemes, total] = await Promise.all([
      Scheme.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Scheme.countDocuments(query),
    ]);

    res.json({
      schemes,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch schemes.' });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found.' });
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to fetch scheme.' });
  }
};

export const createScheme = async (req, res) => {
  try {
    const { name, description, eligibilityCriteria, benefits, applyLink, category } = req.body;
    if (!name || !description || !eligibilityCriteria || !benefits || !applyLink) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const scheme = await Scheme.create({
      name,
      description,
      eligibilityCriteria,
      benefits,
      applyLink,
      category: category || 'General',
    });
    res.status(201).json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to create scheme.' });
  }
};

export const updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!scheme) return res.status(404).json({ message: 'Scheme not found.' });
    res.json(scheme);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to update scheme.' });
  }
};

export const deleteScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found.' });
    res.json({ message: 'Scheme deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Failed to delete scheme.' });
  }
};
