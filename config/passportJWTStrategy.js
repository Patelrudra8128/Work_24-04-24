const passport = require('passport');
const userTbl = require('../models/userTbl');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
    try {
        let user = await userTbl.findOne({ id : jwt_payload.payload.id});        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}));

module.exports = passport;