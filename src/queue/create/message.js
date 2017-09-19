import queue from './queue'

export const sendSimpleMessage = data => {
  try {
    return new Promise((resolve, reject) => {
      queue
        .create('simpleMessage', data)
        .attempts(1)
        .removeOnComplete(true)
        .save(async err => {
          if (err) {
            return reject(err)
          }
          resolve()
        })
    })
  } catch (e) {
    return Promise.reject(e)
  }
}
