import Industry from '../models/Industry.js';

export const getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.find();
    res.status(200).json(industries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (industry) {
      res.status(200).json(industry);
    } else {
      res.status(404).json({ message: 'Industry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
