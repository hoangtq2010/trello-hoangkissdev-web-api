import express from 'express'
import { connectDB } from './config/mongodb.js'
require('dotenv').config()

const app = express()

connectDB().catch(console.log)

// const hostname = 'localhost'
// const port = 8017
app.get('/', (req, res) => {
  res.end('<h1>Hi</h1><hr/>')
})

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`hello, I'm running at ${process.env.HOST}:${process.env.PORT}/`)
})