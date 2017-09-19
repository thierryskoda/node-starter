import config from '../config/environment'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const validateJwt = expressJwt({
  secret: config.secrets.session,
})

export function isAuthenticated(req, res, next) {
  jwt.verify(
    req.headers.authorization,
    config.secrets.session,
    (err, decoded) => {
      if (err) {
        captureError(err)
        return validateJwt(req, res, next)
      }
      next()
    },
  )
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  const signInfo = {}
  return jwt.sign(signInfo, config.secrets.session, {
    expiresIn: 60 * 60 * 60 * 60,
  })
}
