const Pantry = require("../models/Pantry");

exports.getPantryItems = async (req, res) => {
  try {
    const items = await Pantry.find({ userId: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.addPantryItem = async (req, res) => {
  try {
    const { name, quantity, expirationDate } = req.body;
    const item = await Pantry.create({ userId: req.user._id, name, quantity, expirationDate });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updatePantryItem = async (req, res) => {
  try {
    const item = await Pantry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deletePantryItem = async (req, res) => {
  try {
    await Pantry.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
