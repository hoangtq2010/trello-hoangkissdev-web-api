import { MongoClient } from 'mongodb'
// import { env } from './environtment.js'
require('dotenv').config()


const uri = process.env.MONGDODB_URI
console.log(uri)

export const connectDB = async () => {
  const client = new MongoClient (uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  try {
    // Connect the client to the server
    await client.connect()

    // List database
    await listDatabases(client)

    console.log('Connected successfully to server!')
  } finally {
    await client.close()
    console.log('close')
  }
}

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases()
  console.log(databasesList)
  console.log('Your databases:')
  databasesList.databases.forEach(db => { console.log(` - ${db.name}`) })
}