import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from "./models/User";
import bcrypt from "bcrypt";

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false);
      }
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
