import express, { Request, Response } from "express";
import passport from "./passport";
import { body } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "./models/User";

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
    try {
      const { username, email, password } = req.body;

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

// Login a user
router.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    res.json({ message: "Logged in successfully", user: req.user });
  }
);

// List all users
router.get("/users", async (_, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;
