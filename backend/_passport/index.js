const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const cookieExtractor = req => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies.jwt;
    }

    return jwt;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
};

const verifyCallback = (payload, done) => {
    done(null, payload);
};

passport.use("jwt", new Strategy(options, verifyCallback));