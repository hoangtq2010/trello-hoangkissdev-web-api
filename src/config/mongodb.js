import { MongoClient } from 'mongodb'
// import { env } from './environtment.js'
require('dotenv').config()

let dbInstance = null

const uri = process.env.MONGDODB_URI
console.log(uri)

export const connectDB = async () => {
  const client = new MongoClient (uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  // Connect the client to the server
  await client.connect()

  // Assign clientDB to our dbInstance
  dbInstance = client.db(process.env.DATABASE_NAME)
}

// Get database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error('Must connect to Database first!')
  return dbInstance
}
