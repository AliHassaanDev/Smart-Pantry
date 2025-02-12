const mongoose = require("mongoose");

const pantrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  unit: { type: String, default: "pcs" },
  expirationDate: { type: Date },
});

const Pantry = mongoose.models.Pantry || mongoose.model("Pantry", pantrySchema);

module.exports = Pantry;
