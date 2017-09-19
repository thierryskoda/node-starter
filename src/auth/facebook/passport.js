/* eslint camelcase: 0 */

import passport from 'passport'
import {Strategy as FacebookStrategy} from 'passport-facebook'
import FB from 'fb'
import User from '../../api/user/user.model'
import {captureError} from '../../utility/general'

const ObjectId = require('mongoose').Types.ObjectId

export function setup(User, config) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: '/auth/facebook/callback',
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'email'],
      },
      async (req, access_token, refresh_token, profile, done) => {
        try {
          profile._json.access_token = access_token

          await User.findOneAndUpdate(
            {
              'messenger.id': String(userMessengerId),
            },
            {
              $set: {
                facebook: {
                  id: profile._json.id,
                  name: profile._json.name,
                  access_token: profile._json.access_token,
                  login_on: new Date(),
                  ...(profile._json.email
                    ? {email: profile._json.email}
                    : null),
                },
              },
            },
          )

          done()
        } catch (e) {
          captureError(e)
          done(e)
        }
      },
    ),
  )
}
