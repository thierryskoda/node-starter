import url from 'url'
import kue from 'kue'

import {captureError} from '../utility/logHelper'

let redisConfig
if (process.env.REDISTOGO_URL) {
  const parsedUrl = url.parse(process.env.REDISTOGO_URL)
  redisConfig = {
    redis: {
      port: parseInt(parsedUrl.port),
      host: parsedUrl.hostname,
      auth: parsedUrl.auth ? parsedUrl.auth.split(':')[1] : '',
    },
  }
} else {
  redisConfig = {}
}

const queue = kue.createQueue(redisConfig)

queue.on('error', err => {
  captureError('There was an error in the main queue!')
  captureError(err.stack)
})

queue.setMaxListeners(1000)

export default queue

require('./process')
