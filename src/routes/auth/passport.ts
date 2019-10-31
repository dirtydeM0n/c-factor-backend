const passport = require('passport');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
import { User, UserAuth, UserProfile } from '../user/user.model';
import { Role } from '../role/role.model';
const config = require('../../config');

// serialize user into the session
passport.serializeUser(function (user, done) {
  console.log('serializeUser:', user);
  done(null, user);
});

passport.deserializeUser(async function (obj, done) {
  console.log('deserializeUser:', obj);
  try {
    const user = await User.findById(obj.id);
    console.log('user data', user);
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
  console.log('Login with Linkedin ==>', accessToken, refreshToken, profile, req.user);
  if (req.user) {
    try {
      const existingUser = await User.findOne({
        where: { email: profile.emails[0].value },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      if (existingUser) {
        // req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        // done(null);
        done(null, { user: { ...existingUser, ...profile }, msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      } else {
        const user = await User.findById(req.user.id);
        const updateUser = {
          email: profile.emails[0].value,
          profile: {
            email: profile.emails[0].value,
            name: user.name || (profile.name.givenName + ' ' + profile.name.familyName),
            avatar: user.avatar || profile.photos[3].value
          }
        };
        await User.update(updateUser, { where: { id: user.id } });
        const savedUser = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
          }
        });
        let existingAuthUser = await UserAuth.findOne({ where: { userId: savedUser.id, provider: 'linkedin' } });
        const authObj = {
          userId: user.id,
          profile_id: profile.id,
          provider: 'linkedin',
          token: accessToken
        };
        if (existingAuthUser) {
          existingAuthUser = await UserAuth.update(authObj, { where: { profile_id: profile.id, } });
        } else {
          existingAuthUser = await UserAuth.create(authObj);
        }
        // req.flash('info', { msg: 'LinkedIn account has been linked.' });
        done(null, { user: { ...savedUser, ...profile, auth: existingAuthUser }, msg: 'LinkedIn account has been linked.' });
      }
    } catch (err) {
      return done(err);
    }
  } else if (profile) {
    try {
      let userAuth = await UserAuth.findOne({
        where: { profile_id: profile.id }
      });
      if (userAuth) {
        // req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        // done(null);
        done(null, { user: { ...profile, auth: userAuth }, msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      } else {
        const existingUser = await User.findOne({
          where: { email: profile.emails[0].value },
          attributes: {
            exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
          }
        });
        if (existingUser) {
          // req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
          // return done(null);
          return done(null, { user: { ...existingUser, ...profile, auth: userAuth }, msg: 'There is already an account using this email address. Sign in to that account and link it with LinkedIn manually from Account Settings.' });
        } else {
          const role = await Role.findOne({ where: { value: 'applicant' } });
          const savedUser = await User.create({
            email: profile.emails[0].value,
            userType: 'applicant',
            roleId: role ? role.id : null, // applicant
            status: 'accepted'
          });
          const userProfile = await UserProfile.create({
            userId: savedUser.id,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            avatar: profile.photos[3].value
          });
          userAuth = await UserAuth.create({
            userId: savedUser.id,
            profile_id: profile.id,
            provider: 'linkedin',
            token: accessToken
          });
          // req.flash('info', { msg: 'LinkedIn account has been linked.' });
          // done(null);
          done(null, { user: { ...savedUser, ...profile, auth: userAuth }, msg: 'LinkedIn account has been linked.' });
        }
      }
    } catch (err) {
      return done(err);
    }
  }
}));

module.exports = passport;