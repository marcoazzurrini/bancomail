// import passport from "passport";
// import { BasicStrategy } from "passport-http";
// import { User } from "./models/User";
// import bcrypt from "bcrypt";
//
// passport.use(
//   new BasicStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ where: { username } });
//       if (!user) {
//         return done(null, false);
//       }
//       const isValidPassword = await bcrypt.compare(password, user.password);
//
//       if (!isValidPassword) {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );
// passport.serializeUser((user: any, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser(async (id: any, done) => {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });
//
// export default passport;
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/User";
import bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Use email as the username field
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
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
    }
  )
);
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
