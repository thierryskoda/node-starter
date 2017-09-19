import {captureError} from '../utility/logHelper'

let redis
if (process.env.REDISTOGO_URL) {
  let rtg = require('url').parse(process.env.REDISTOGO_URL)
  redis = require('redis').createClient(rtg.port, rtg.hostname)
  redis.auth(rtg.auth.split(':')[1])
} else {
  redis = require('redis').createClient()
}

redis.on('error', captureError)

export const setToRedis = (key, TTL, data) => {
  redis.setex(key, TTL, data)
}

export const getFromRedisPromise = key => {
  return new Promise((resolve, reject) =>
    redis.get(key, (err, res) => (err || !res ? resolve(null) : resolve(res))),
  )
}

export default redis
