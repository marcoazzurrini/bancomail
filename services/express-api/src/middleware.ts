import { Request, Response, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const session = req.session as unknown as { userId: number };
  if (session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuthenticated;
