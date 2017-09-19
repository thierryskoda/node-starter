import {isTestingUser} from './general'

export const captureError = err => {
  if (!err) {
    return 'ERROR, no error passed'
  }
  if (err.stack) {
    console.error('ERROR stack:', err.stack)
  } else {
    console.error('ERROR:', err)
  }
}

export const logMessage = async (message, inProductionOrUser) => {
  // If the current user is myself
  if (
    inProductionOrUser &&
    typeof inProductionOrUser === 'object' &&
    inProductionOrUser.first_name &&
    isTestingUser(inProductionOrUser)
  ) {
    console.log(message)
  } else if (inProductionOrUser && typeof inProductionOrUser === 'boolean') {
    console.log(message)
  } else if (process.env.NODE_ENV !== 'production') {
    console.log(message)
  }
}
