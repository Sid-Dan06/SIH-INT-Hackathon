import express from "express";
import { createClaim, getClaims } from "../controllers/claimsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createClaim);
router.get("/", protect, getClaims);

export default router;
