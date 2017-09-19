/**************************************************************************************************************
 *  Seed data for development
 *  Populate DB with sample data on server start
 *  to disable, edit config/environment/index.js, and set `seedDB: false`
 **************************************************************************************************************/
import User from '../api/user/user.model'
import {captureError} from '../utility/logHelper'
// const ObjectId = require('mongoose').Types.ObjectId
import {ObjectId} from 'mongoose/Types'

export default async function generateSeedData(config) {
  if (!config.seedDB) {
    return Promise.resolve()
  }

  try {
    console.time(
      '--------------------------Seed config---------------------------',
    )
    console.timeEnd(
      '--------------------------Seed config---------------------------',
    )
  } catch (e) {
    captureError(e)
  }
}
