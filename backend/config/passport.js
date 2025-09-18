import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import jwt from "jsonwebtoken";

export default function passportConfig() {
  // ================= GOOGLE =================
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          // Create JWT with user info
          const token = jwt.sign(
            {
              id: profile.id,
              provider: "google",
              email: profile.emails?.[0]?.value,
              name: profile.displayName,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "7d" }
          );

          return done(null, { token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // ================= GITHUB =================
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          const token = jwt.sign(
            {
              id: profile.id,
              provider: "github",
              username: profile.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "7d" }
          );

          return done(null, { token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  // Sessions
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
}
