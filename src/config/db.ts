import mysql, { Pool, PoolConnection, RowDataPacket } from 'mysql2/promise';

interface QueryResult extends RowDataPacket {
  [key: string]: any;
}

const pool: Pool = mysql.createPool({
  host: 'atusaludlicoreria.com',
  user: 'atusalud_atusalud',
  password: 'kmachin1',
  database: 'atusalud_base1',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default {
  async query<T = QueryResult>(sql: string, params?: any[]): Promise<[T[], any]> {
    const connection: PoolConnection = await pool.getConnection();
    try {
      const [rows, fields] = await connection.query<T & RowDataPacket[]>(sql, params);
      return [rows as T[], fields];
    } finally {
      connection.release();
    }
  }
};
