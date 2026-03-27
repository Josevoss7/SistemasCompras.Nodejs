const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

async function testarConexao() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Conectado ao MariaDB com sucesso.');
  } catch (erro) {
    console.error('Erro ao conectar no MariaDB:', erro.message);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { pool, testarConexao };