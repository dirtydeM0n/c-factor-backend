const passport = require('passport');
const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
import { User, UserAuth } from '../user/user.model';
import { Role } from '../role/role.model';
const config = require('../../config');

// serialize user into the session
passport.serializeUser(function (user, done) {
  try {
    console.log('serializeUser:', user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.deserializeUser(async function (obj, done) {
  console.log('deserializeUser:', obj);
  try {
    // const user = await User.findOne({ where: { id: obj.id } });
    done(null, obj);
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
      let user = await User.findOne({
        where: { email: profile.emails[0].value },
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      if (user) {
        // req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        // done(null);
        const auth = await UserAuth.findOne({ where: { userId: user.id, provider: 'linkedin' } });
        done(null, { data: { user, auth }, msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      } else {
        user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {

        }
        await User.update({
          email: profile.emails[0].value,
          name: user.name || (profile.name.givenName + ' ' + profile.name.familyName),
          avatar: user.avatar || profile.photos[3].value
        }, { where: { id: user.id } });
        user = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
          }
        });
        let auth = await UserAuth.findOne({ where: { userId: user.id, provider: 'linkedin' } });
        const authObj = {
          userId: user.id,
          profile_id: profile.id,
          provider: 'linkedin',
          token: accessToken
        };
        if (auth) {
          await UserAuth.update(authObj, { where: { profile_id: profile.id, } });
          auth = { auth, ...authObj };
        } else {
          auth = await UserAuth.create(authObj);
        }
        // req.flash('info', { msg: 'LinkedIn account has been linked.' });
        done(null, { data: { user, auth }, msg: 'LinkedIn account has been linked.' });
      }
    } catch (err) {
      return done(err);
    }
  } else {
    try {
      let auth = null;
      let whereObj = null;
      if (profile.id) {
        auth = await UserAuth.findOne({
          where: { profile_id: profile.id }
        });
        whereObj = auth ? { id: auth.userId } : null;
      }
      whereObj = whereObj ? whereObj : { email: profile.emails[0].value };
      let user = await User.findOne({
        where: whereObj,
        attributes: {
          exclude: ['password', 'resetToken', 'resetTokenSentAt', 'resetTokenExpireAt', 'activationToken', 'activationTokenExpireAt']
        }
      });
      if (user) {
        // req.flash('errors', { msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        // done(null);
        done(null, { data: { user, auth }, msg: 'There is already a LinkedIn account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      } else {
        const role = await Role.findOne({ where: { value: 'applicant' } });
        user = await User.create({
          email: profile.emails[0].value,
          userType: 'applicant',
          roleId: role ? role.id : null, // applicant
          status: 'accepted',
          name: profile.name.givenName + ' ' + profile.name.familyName,
          avatar: profile.photos[3].value
        });
        auth = await UserAuth.create({
          userId: user.id,
          profile_id: profile.id,
          provider: 'linkedin',
          token: accessToken
        });
        // req.flash('info', { msg: 'LinkedIn account has been linked.' });
        // done(null);
        done(null, { data: { user, auth }, msg: 'LinkedIn account has been linked.' });
      }
    } catch (err) {
      return done(err);
    }
  }
}));

module.exports = passport;