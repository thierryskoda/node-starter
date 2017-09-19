import path from 'path'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

// All configurations will extend these options
// ============================================
const config = {
  // Root path of server
  root: path.normalize(`${__dirname}/../..`),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/my-local-database',
    options: {
      useMongoClient: true,
    },
  },

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET || 'node-starter',
  },

  // Services domain
  domain: process.env.DOMAIN || 'example.com',

  assetsDomainStatic: process.env.ASSETS_DOMAIN || 'amazon.com',

  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
  },
}

export default config
