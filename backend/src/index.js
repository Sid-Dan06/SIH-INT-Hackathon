// backend/src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectDB from "../config/db.js";
import passportConfig from "../config/passport.js";
import oauthRoutes from "../routes/oauthRoutes.js";
import authRoutes from "../routes/authRoutes.js";
import claimsRoutes from "../routes/claimsRoutes.js";
import userRoutes from "../routes/user.js";

dotenv.config();
connectDB();
passportConfig();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);   // manual login/register
app.use("/api/oauth", oauthRoutes); // Google/GitHub login
app.use("/api/claims", claimsRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("✅ Backend is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
