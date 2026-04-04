const { pool } = require('../config/db');

async function listarOrdensCompra() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT
        oc.id,
        oc.status,
        oc.observacoes,
        oc.fornecedor_id,
        oc.requisicao_id,
        oc.created_at,
        f.nome AS fornecedor_nome,
        p.nome AS produto_nome,
        oci.produto_id,
        oci.quantidade,
        oci.preco_unitario,
        r.solicitante AS requisicao_solicitante,
        r.setor AS requisicao_setor
      FROM ordens_compra oc
      LEFT JOIN fornecedores f ON f.id = oc.fornecedor_id
      LEFT JOIN ordem_compra_itens oci ON oci.ordem_compra_id = oc.id
      LEFT JOIN produtos p ON p.id = oci.produto_id
      LEFT JOIN requisicoes r ON r.id = oc.requisicao_id
      ORDER BY oc.id DESC
    `);
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function buscarOrdemCompraPorId(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT
         oc.id,
         oc.status,
         oc.observacoes,
         oc.fornecedor_id,
         oc.requisicao_id,
         oci.produto_id,
         oci.quantidade,
         oci.preco_unitario
       FROM ordens_compra oc
       LEFT JOIN ordem_compra_itens oci ON oci.ordem_compra_id = oc.id
       WHERE oc.id = ?`,
      [id]
    );
    return rows[0] || null;
  } finally {
    if (conn) conn.release();
  }
}

async function criarOrdemCompra(dados) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    const result = await conn.query(
      `INSERT INTO ordens_compra (fornecedor_id, requisicao_id, status, observacoes)
       VALUES (?, ?, ?, ?)`,
      [
        dados.fornecedor_id,
        dados.requisicao_id || null,
        dados.status || 'ABERTA',
        dados.observacoes || ''
      ]
    );

    const ordemCompraId = result.insertId;

    await conn.query(
      `INSERT INTO ordem_compra_itens (ordem_compra_id, produto_id, quantidade, preco_unitario)
       VALUES (?, ?, ?, ?)`,
      [
        ordemCompraId,
        dados.produto_id,
        dados.quantidade || 1,
        dados.preco_unitario || 0
      ]
    );

    await conn.commit();
    return ordemCompraId;
  } catch (erro) {
    if (conn) await conn.rollback();
    throw erro;
  } finally {
    if (conn) conn.release();
  }
}

async function atualizarOrdemCompra(id, dados) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    await conn.query(
      `UPDATE ordens_compra
       SET fornecedor_id = ?, requisicao_id = ?, status = ?, observacoes = ?
       WHERE id = ?`,
      [
        dados.fornecedor_id,
        dados.requisicao_id || null,
        dados.status || 'ABERTA',
        dados.observacoes || '',
        id
      ]
    );

    await conn.query(
      `UPDATE ordem_compra_itens
       SET produto_id = ?, quantidade = ?, preco_unitario = ?
       WHERE ordem_compra_id = ?`,
      [
        dados.produto_id,
        dados.quantidade || 1,
        dados.preco_unitario || 0,
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

async function excluirOrdemCompra(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('DELETE FROM ordens_compra WHERE id = ?', [id]);
    return true;
  } finally {
    if (conn) conn.release();
  }
}

async function contarOrdensPendentes() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT COUNT(*) AS total FROM ordens_compra WHERE status IN ('ABERTA', 'PENDENTE')"
    );
    return Number(rows[0].total);
  } finally {
    if (conn) conn.release();
  }
}

async function somarValorTotalCompras() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT COALESCE(SUM(quantidade * preco_unitario), 0) AS total
      FROM ordem_compra_itens
    `);
    return Number(rows[0].total);
  } finally {
    if (conn) conn.release();
  }
}

async function listarFornecedoresMaisUsados() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT
        f.id,
        f.nome,
        COUNT(oc.id) AS total_pedidos
      FROM fornecedores f
      LEFT JOIN ordens_compra oc ON oc.fornecedor_id = f.id
      GROUP BY f.id, f.nome
      ORDER BY total_pedidos DESC, f.nome ASC
      LIMIT 4
    `);
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

async function listarComprasPorMes() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(`
      SELECT
        MONTH(oc.created_at) AS mes_numero,
        COALESCE(SUM(oci.quantidade * oci.preco_unitario), 0) AS total
      FROM ordens_compra oc
      LEFT JOIN ordem_compra_itens oci ON oci.ordem_compra_id = oc.id
      WHERE oc.created_at IS NOT NULL
      GROUP BY MONTH(oc.created_at)
      ORDER BY MONTH(oc.created_at)
    `);
    return rows;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  listarOrdensCompra,
  buscarOrdemCompraPorId,
  criarOrdemCompra,
  atualizarOrdemCompra,
  excluirOrdemCompra,
  contarOrdensPendentes,
  somarValorTotalCompras,
  listarFornecedoresMaisUsados,
  listarComprasPorMes
};