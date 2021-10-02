const WHITELIST_DOMAIN = ['http://localhost:3000', 'http://example2.com']
export const corsOptions = {
  origin: function (origin, callback) {
    if (WHITELIST_DOMAIN.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`${origin} Not allowed by CORS`))
    }
  },
  optionsSuccessStatus: 200
}