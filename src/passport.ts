import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from "./models/User"; // You'll create this model later
import bcrypt from "bcrypt";

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      console.log("username", username);
      console.log("password", password);
      console.log("user", user);
      if (!user) return done(null, false);
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log("Valid password:", isValidPassword);

      if (!isValidPassword) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
