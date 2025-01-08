import 'dotenv/config'
import postgres from 'postgres'

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = postgres({
    host: PGHOST,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: 5432,
})

