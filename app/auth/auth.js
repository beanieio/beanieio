const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const { User } = require('../models/models.js');
const debug = process.env.DEBUG || false;

// ==========  Passport Utilities  ============ \\
passport.serializeUser((user, done) => {
  if (debug) { console.log('Serializing user: ', user); }
  done(null, user.username);
});
// using username to get user data
passport.deserializeUser((username, done) => {
  if (debug) { console.log('Deserializing user with: ', username); }
  User.findOne({username: username}).then(user => done(null, user))
    .catch(err => console.log(err));
});
// ============================================= //

// ==========  JWT Strategy Setup  ============ \\
// using auth header as bearer token requires auth as:
// header: 'Authorization': 'bearer TOKEN_GOES_HERE'
// have to export these to use them to encode and provide tokens in response
module.exports.jwtOptions = jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'BeanieioToRuleThemAll',
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  if (debug) { console.log('JWT token payload received:', jwtPayload); }
  User.findOne({username: jwtPayload.username}).then(user => {
    if (user) { done(null, user); } else { done(null, false); }
  });
}));
// helper functions to provide auth checking based on token
module.exports.jwtAuth = () => passport.authenticate('jwt', {session: false});

// ==========  Local Strategy Setup  ============ \\
passport.use(new LocalStrategy(function(username, password, done) {
  if (debug) { console.log('Local auth - user: ', username, ' pwd: ', password); }
  User.findOne({username: username}).then(user => {
    if (user) { //TODO: confirm naming of comparePassword function with Phil
      return user.comparePassword(password)
        .then(match => {
          if (match) { done(null, user); } else { done(null, false, {messages: 'Incorrect password'}); }
        });
    } else { done(null, false, {messages: 'User not found'}); }
  }).catch(err => console.log(err));
}));
// helper functions to provide
module.exports.pwdAuth = () => passport.authenticate('local', {session: false});
module.exports.passport = passport;
