import express from 'express'
import { connectDB } from './config/mongodb.js'
import { BoardModel } from './models/board.model'
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

  app.get('/test', async (req, res) => {
    // let fakeData = {
    //   title: 'hoangdev'
    // }
    // await BoardModel.createNew(fakeData)

    res.end('<h1>Hi</h1><hr/>')
  })

  app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`hello, I'm running at ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
  })
}
