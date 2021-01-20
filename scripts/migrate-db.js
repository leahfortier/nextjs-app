const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

console.log({ envPath })

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_ENDPOINT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

// Create table if does not exist
async function migrate() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS puppy_blog (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        title VARCHAR(100) NOT NULL,
        content TEXT NOT NULL
      )
    `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error(e.message)
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

migrate().then(() => process.exit())
