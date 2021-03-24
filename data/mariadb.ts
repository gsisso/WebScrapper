import mariadb, {Pool} from 'mariadb';

let pool: Pool = null;

export async function getConnection(): Promise<Pool> {
    if (pool == null) {
        pool = await mariadb.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME
        });
    }
    return pool;
}