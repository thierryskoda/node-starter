/**
 * Express configuration
 */
import express from 'express'
import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
import errorHandler from 'errorhandler'
import path from 'path'
import passport from 'passport'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import {handlebars} from 'consolidate'

export default function(config) {
  const app = express()
  const env = app.get('env')

  app.set('appPath', path.join(config.root, 'public'))

  app.use(helmet())
  app.use(express.static(app.get('appPath')))
  app.use(cors())

  // Fix bug for creating league. TMP
  app.use(
    (req, res, next) =>
      req.method === 'OPTIONS' ? res.status(200).end() : next(),
  )

  app.set('views', `${config.root}/views`)
  app.engine('hbs', handlebars)
  app.set('view engine', 'hbs')

  app.use(compression())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  // app.use(cookieParser())

  // Session
  app.use(
    require('express-session')({
      secret: config.secrets.session,
      resave: true,
      saveUninitialized: true,
    }),
  )

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // app.use(
  //     require('forest-express-mongoose').init({
  //         modelsDir: path.join(__dirname, '/../api/user/'), // Your models directory.
  //         envSecret: process.env.FOREST_ENV_SECRET,
  //         authSecret: process.env.FOREST_AUTH_SECRET,
  //         mongoose: require('mongoose') // The mongoose database connection.
  //     })
  // )

  // MIGHT NOW NEED unless we use twitter login?
  // app.use(session({
  //   secret: config.secrets.session,
  //   saveUninitialized: true,
  //   resave: false
  // })

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()) // Error handler - has to be last
  }

  return Promise.resolve(app)
}
