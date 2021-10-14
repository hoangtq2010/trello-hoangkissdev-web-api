import express from 'express'
import { connectDB } from './config/mongodb.js'
import { apiV1 } from './routes/v1/index'
import cors from 'cors'
import { corsOptions } from './config/cors'

require('dotenv').config()

connectDB() //khi kết nối với db thành công thì mới bootserver
  .then(() => console.log('Connected successfully to database server!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body data (body.parser)
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', apiV1)

  // app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  //   console.log(`hello, I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
  // })
  // Support heroku deploy
  app.listen(process.env.PORT, () => {
    console.log(`hello, I'm running at port :${process.env.PORT}/`)
  })
}

