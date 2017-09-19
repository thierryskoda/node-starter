import mongoose from 'mongoose'
import config from './environment'

const onMongooseError = err => {
  console.error(`MongoDB connection error: \n${err}`)
  process.exit(-1) // TODO: Should we really exit the process in prod ?
}

export default function(app) {
  mongoose.Promise = global.Promise

  // Connect to MongoDb
  return mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
    console.log(`Mongo connected to [${config.mongo.uri}]`)
    // Setup a listener for errors
    mongoose.connection.on('error', onMongooseError)
    return app
  })
}
