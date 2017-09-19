import {captureError} from '../../utility/logHelper'
import {wait} from '../../utility/general'
import queue from '../queue'

const DONT_EXECUTE_QUEUES = true

queue.process('simpleMessage', async (job, done) => {
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
