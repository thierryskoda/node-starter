if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
require('babel-polyfill')
require('./app')
