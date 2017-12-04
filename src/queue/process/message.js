import {captureError} from '../../utility/logHelper'
import {wait} from '../../utility/general'

const DONT_EXECUTE_QUEUES = true

export default function startProcessingSimpleMessage(queue) {
  return queue.process('simpleMessage', async (job, done) => {
    if (DONT_EXECUTE_QUEUES && process.env.NODE_ENV === 'development') {
      return done()
    }

    const {data} = job

    try {
      await sleep(5000)
      done()
    } catch (e) {
      captureError(e)
      done(e)
    }
  }) 
}
