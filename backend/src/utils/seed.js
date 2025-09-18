import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import User from "../../models/User.js";
import Claim from "../../models/Claim.js";

dotenv.config();

async function seed() {
  try {
    await connectDB();

    // Clear old data
    await User.deleteMany();
    await Claim.deleteMany();

    // ✅ Create admin user (password will be hashed automatically)
    const admin = new User({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123", 
      role: "admin",
    });
    await admin.save();

    // Create sample claim
    await Claim.create({
      block: "Block 1",
      village: "Village A",
      status: "Approved",
      location: { type: "Point", coordinates: [78.0, 19.0] },
      createdBy: admin._id,
    });

    console.log("✅ Database Seeded Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding Failed:", err);
    process.exit(1);
  }
}

seed();
