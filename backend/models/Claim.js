import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  block: String,
  village: String,
  status: { type: String, enum: ["Approved", "Pending", "Rejected"] },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

claimSchema.index({ location: "2dsphere" }); // for geospatial queries

export default mongoose.model("Claim", claimSchema);
