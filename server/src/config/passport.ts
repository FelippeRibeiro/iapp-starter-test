import { Strategy as JwtStategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import { User } from "../models/User";

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const localOpts = {
  usernameField: "document",
};

export default (passport: any) => {
  //JWT authentication strategy
  passport.use(
    new JwtStategy(jwtOpts, async (payload, done) => {
      try {
        const user = await User.findById(payload._id);
        if (user) return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error, false);
      }
    })
  );
  //Local authentication strategy
  passport.use(
    new LocalStrategy(localOpts, async (document, password, done) => {
      try {
        const user = await User.findOne({ document: document });
        if (!user) return done(undefined, false);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return done(undefined, false);
        return done(undefined, user);
      } catch (error) {
        console.error(error);
        return done(error, false);
      }
    })
  );
};
