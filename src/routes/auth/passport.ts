const passport = require('passport');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
import { User, UserAuth, UserProfile } from '../user/user.model';
const config = require('../../config');

// serialize user into the session
passport.serializeUser(function (user, done) {
  console.log('serializeUser:', user);
  done(null, user);
});

passport.deserializeUser(async function (obj, done) {
  console.log('serializeUser:', obj);
  try {
    const user = await User.findById(obj.id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with LinkedIn.
 */
passport.use(new LinkedInStrategy({
  clientID: config.auth.linkedin.clientID,
  clientSecret: config.auth.linkedin.clientSecret,
  callbackURL: config.auth.linkedin.callbackURL,
  scope: ['r_liteprofile', 'r_emailaddress'],
  state: true,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  console.log('Login with Linkedin.....');
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);
  console.log('req.user', req.user);
  if (req.user) {
    try {
      const existingUser = await User.findOne({ where: { email: profile.emails[0].value } });
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(null);
      } else {
        const user = await User.findById(req.user.id);
        const updateUser = {
          email: profile.emails[0].value,
          profile: {
            email: profile.emails[0].value,
            firstname: user.firstname || profile.name.givenName,
            lastname: user.lastname || profile.name.familyName,
            avatar: user.avatar || profile.photos[3].value
          }
        };
        const savedUser = await User.update(updateUser, { where: { id: user.id } });
        const existingAuthUser = await UserAuth.findOne({ where: { userId: savedUser.id, provider: 'linkedin' } });
        const authObj = {
          userId: savedUser.id,
          profile_id: profile.id,
          provider: 'linkedin',
          token: accessToken
        };
        if (existingAuthUser) {
          await UserAuth.update(authObj, { where: { profile_id: profile.id, } });
        } else {
          await UserAuth.create(authObj);
        }
        req.flash('info', { msg: 'LinkedIn account has been linked.' });
        done(null, savedUser);
      }
    } catch (err) {
      return done(err);
    }
  } else {
    try {
      const existingUser = await UserAuth.findOne({ where: { profile_id: profile.id } });
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(null);
      } else {
        const existingEmailUser = await User.findOne({ where: { email: profile.emails[0].value } });
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
          return done(null);
        } else {
          const savedUser = await User.create({
            email: profile.emails[0].value,
            roleId: 'f5ec4590-cabe-11e9-9ed6-83ec78200e60', // applicant
            status: 'accepted'
          });
          await UserProfile.create({
            userId: savedUser.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            avatar: profile.photos[3].value
          });
          await UserAuth.create({
            userId: savedUser.id,
            profile_id: profile.id,
            provider: 'linkedin',
            token: accessToken
          });
          req.flash('info', { msg: 'LinkedIn account has been linked.' });
          done(null, savedUser);
        }
      }
    } catch (err) {
      return done(err);
    }
  }
}));

module.exports = passport;