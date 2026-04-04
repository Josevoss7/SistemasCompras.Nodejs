const { pool } = require('../config/db');

async function listarProdutos() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT
        p.id,
        p.nome,
        p.descricao,
        p.categoria,
        p.preco,
        p.estoque,
        p.fornecedor_id,
        f.nome AS fornecedor_nome
      FROM produtos p
      LEFT JOIN fornecedores f ON p.fornecedor_id = f.id
      ORDER BY p.id DESC
    `);
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function buscarProdutoPorId(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT id, nome, descricao, categoria, preco, estoque, fornecedor_id
       FROM produtos
       WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
}

async function criarProduto(produto) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO produtos (nome, descricao, categoria, preco, estoque, fornecedor_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        produto.nome,
        produto.descricao || '',
        produto.categoria,
        produto.preco,
        produto.estoque,
        produto.fornecedor_id || null
      ]
    );
    return result.insertId;
  } finally {
    if (conn) conn.release();
  }
}

async function atualizarProduto(id, produto) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE produtos
       SET nome = ?, descricao = ?, categoria = ?, preco = ?, estoque = ?, fornecedor_id = ?
       WHERE id = ?`,
      [
        produto.nome,
        produto.descricao || '',
        produto.categoria,
        produto.preco,
        produto.estoque,
        produto.fornecedor_id || null,
        id
      ]
    );
  } finally {
    if (conn) conn.release();
  }
}

async function excluirProduto(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM produtos WHERE id = ?', [id]);
  } finally {
    if (conn) conn.release();
  }
}

async function contarProdutos() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT COUNT(*) AS total FROM produtos');
    return Number(rows[0].total);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  excluirProduto,
  contarProdutos
};