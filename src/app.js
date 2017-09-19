import moment from 'moment'
import http from 'http'

import config from './config/environment'
import expressConfig from './config/express'
import routesConfig from './config/routes'
import mongooseConfig from './config/mongoose'
import {captureError} from './utility/logHelper'

import './config/redis'
import './queue/queue'

expressConfig(config)
  .then(app => mongooseConfig(app))
  .then(app => routesConfig(app))
  .then(app => Promise.resolve({app: app, server: http.createServer(app)}))
  .then(
    ({app, server}) =>
      new Promise((resolve, reject) => {
        app.myApp = server.listen(
          config.port,
          config.ip,
          err => (err ? reject(err) : resolve({app, server})),
        )
      }),
  )
  .then(({app, server}) =>
    console.log(
      `Express server listening on ${config.ip ||
        'localhost'}:${config.port} in ${app.get(
        'env',
      )} and server time is ${moment().toDate()}`,
    ),
  )
  .catch(captureError)
