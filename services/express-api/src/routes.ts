import express, { Request, Response } from "express";
import passport from "./passport";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "./models/User";
import isAuthenticated from "./middleware";

const router = express.Router();

// Register a new user
router.post(
  "/register",
  [
    body("username").notEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "User with this username or email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
);

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("basic", { session: true }, (err: any, user: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const session = req.session as unknown as { userId: number };
      session.userId = user.id;
      return res.json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

// Logout
router.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.json({ message: "Logged out successfully" });
    }
  });
});

// List all users
router.get("/users", isAuthenticated, async (_, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get("/api/checkAuth", (req, res) => {
  const session = req.session as unknown as { userId: number };
  if (session.userId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

export default router;
