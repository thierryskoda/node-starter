import Koa from 'Koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import devLogger from 'koa-logger'
import passport from 'koa-passport'
import cors from 'kcors'
import errorMiddleware from '../middleware/error'

export default function(config) {
  const app = new Koa()

  if (process.env.NODE_ENV === 'development') {
    app.use(devLogger())
  }

  app.use(helmet())
  app.use(cors())

  app.use(helmet())
  app.use(bodyParser())

  // Sessions
  app.keys = [config.secrets.session]
  app.use(session({}, app))

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(errorMiddleware())

  return Promise.resolve(app)
}
