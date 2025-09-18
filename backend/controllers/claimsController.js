import Claim from "../models/Claim.js";

export const createClaim = async (req, res) => {
  try {
    const claim = new Claim({ ...req.body, createdBy: req.user.id });
    await claim.save();
    res.json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate("createdBy", "name email");
    res.json(claims);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
