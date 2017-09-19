import {testingUsers} from '../constant/general'

export const mendatory = field => {
  throw new Error(`${field} is needed`)
}

export function handleError(res, statusCode) {
  statusCode = statusCode || 500
  return function(err) {
    console.log('ERROR:', err)
    return res.status(statusCode).send(err)
  }
}

export function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200
  return function(entity) {
    if (entity) {
      return res.status(statusCode).json(entity)
    }
    return res.status(404).json(null)
  }
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve), ms)
}

export function isTestingUser(user) {
  return testingUsers.find(
    u => user.first_name === u.first_name && user.last_name === u.last_name,
  )
}

// SUPER HELPFUL
process.on('unhandledRejection', r => captureError(r))
