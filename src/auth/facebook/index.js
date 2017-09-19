import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/callback', (req, res, next) => {
  passport.authenticate(
    'facebook',
    {
      scope: ['email', 'user_friends'],
      failureRedirect: '/',
      session: false,
      state: JSON.stringify({
        redirect_uri: req.query.redirect_uri,
        account_linking_token: req.query.account_linking_token,
      }),
      passReqToCallback: true,
    },
    () => res.redirect(req.redirect_uri),
  )(req, res, next)
})

export default router
