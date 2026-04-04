const { pool } = require('../config/db');

async function listarRequisicoes() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT
        r.id,
        r.solicitante,
        r.setor,
        r.status,
        r.observacoes,
        p.nome AS produto_nome,
        ri.produto_id,
        ri.quantidade
      FROM requisicoes r
      LEFT JOIN requisicao_itens ri ON ri.requisicao_id = r.id
      LEFT JOIN produtos p ON p.id = ri.produto_id
      ORDER BY r.id DESC
    `);
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function buscarRequisicaoPorId(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT
         r.id,
         r.solicitante,
         r.setor,
         r.status,
         r.observacoes,
         ri.produto_id,
         ri.quantidade
       FROM requisicoes r
       LEFT JOIN requisicao_itens ri ON ri.requisicao_id = r.id
       WHERE r.id = ?`,
      [id]
    );
    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
}

async function criarRequisicao(dados) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const result = await conn.query(
      `INSERT INTO requisicoes (solicitante, setor, status, observacoes)
       VALUES (?, ?, ?, ?)`,
      [
        dados.solicitante,
        dados.setor,
        dados.status || 'ABERTA',
        dados.observacoes || ''
      ]
    );

    const requisicaoId = result.insertId;

    await conn.query(
      `INSERT INTO requisicao_itens (requisicao_id, produto_id, quantidade)
       VALUES (?, ?, ?)`,
      [
        requisicaoId,
        dados.produto_id,
        dados.quantidade || 1
      ]
    );

    await conn.commit();
    return requisicaoId;
  } catch (erro) {
    if (conn) await conn.rollback();
    throw erro;
  } finally {
    if (conn) conn.release();
  }
}

async function atualizarRequisicao(id, dados) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    await conn.query(
      `UPDATE requisicoes
       SET solicitante = ?, setor = ?, status = ?, observacoes = ?
       WHERE id = ?`,
      [
        dados.solicitante,
        dados.setor,
        dados.status || 'ABERTA',
        dados.observacoes || '',
        id
      ]
    );

    await conn.query(
      `UPDATE requisicao_itens
       SET produto_id = ?, quantidade = ?
       WHERE requisicao_id = ?`,
      [
        dados.produto_id,
        dados.quantidade || 1,
        id
      ]
    );

    await conn.commit();
    return true;
  } catch (erro) {
    if (conn) await conn.rollback();
    throw erro;
  } finally {
    if (conn) conn.release();
  }
}

async function excluirRequisicao(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM requisicoes WHERE id = ?', [id]);
    return true;
  } finally {
    if (conn) conn.release();
  }
}

async function contarRequisicoesAbertas() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT COUNT(*) AS total FROM requisicoes WHERE status = 'ABERTA'"
    );
    return Number(rows[0].total);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  listarRequisicoes,
  buscarRequisicaoPorId,
  criarRequisicao,
  atualizarRequisicao,
  excluirRequisicao,
  contarRequisicoesAbertas
};