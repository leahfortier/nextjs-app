const path = require("path");
const envPath = path.resolve(process.cwd(), ".env.local");

console.log({ envPath });

require("dotenv").config({ path: envPath });

const mysql = require("serverless-mysql");

const db = mysql({
    config: {
        host: process.env.MYSQL_ENDPOINT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
    },
});

async function query(q) {
    try {
        const results = await db.query(q);
        await db.end();
        return results;
    } catch (e) {
        throw Error(e.message);
    }
}

// Create user and task tables if does not yet exist
async function migrate() {
    try {
        // TODO: This should use UserTable.create() instead of hardcoding the query, but I was having
        // more trouble publishing the sql package than I would have liked...
        await query(`
            CREATE TABLE IF NOT EXISTS user_data (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                data TEXT NOT NULL
            )`);

        await query(`
            CREATE TABLE IF NOT EXISTS task_data (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                date DATE NOT NULL,
                task_name VARCHAR(100) NOT NULL,
                data TEXT
            )`);

        console.log("migration ran successfully");
    } catch (e) {
        console.error(e.message);
        console.error("could not run migration, double check your credentials.");
        process.exit(1);
    }
}

migrate().then(() => process.exit());
