const config = require('../knexfile');
const knex = require('knex')(config);

// Função para buscar dados no banco de dados e listar
exports.getData = async (req, res) => {
  try {
    const { startDate, endDate, item, status, type } = req.body;

    let querySelect = `
      SELECT id, item, description, status, type, created_at, updated_at
      FROM mobile_stock
      WHERE created_at BETWEEN ? AND ?
    `;

    const queryParams = [startDate, endDate];

    console.log('Query SQL:', querySelect, queryParams);

    const returnData = await knex.raw(querySelect, queryParams);

    res.json({ data: returnData.rows });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar dados no banco de dados.' });
  }
};

// Função para realizar a exclusão no banco de dados.
exports.updateData = async (req, res) => {
  try {
    const id = req.body.id; 

    if (!id) {
      return res.status(400).json({ error: 'ID do item não fornecido.' });
    }

    await knex('mobile_stock').where('id', id).del();

    res.json({ success: true, message: 'Item excluído com sucesso.' });

  } catch (error) {
    console.error('Erro ao excluir o item:', error);
    res.status(500).json({ error: 'Erro ao excluir o item.' });
  }
};

exports.getDataDashboard = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Consulta para contar a quantidade de ocorrências de cada status (in_stock)
    const inStockCountsQuery = `
      SELECT COUNT(*) AS count
      FROM mobile_stock
      WHERE created_at BETWEEN ? AND ?
      AND status = 'in_stock';
    `;
    const inStockCounts = await knex.raw(inStockCountsQuery, [startDate, endDate]);

    // Consulta para contar a quantidade de ocorrências de cada status (out_of_stock)
    const outOfStockCountsQuery = `
      SELECT COUNT(*) AS count
      FROM mobile_stock
      WHERE created_at BETWEEN ? AND ?
      AND status = 'out_of_stock';
    `;
    const outOfStockCounts = await knex.raw(outOfStockCountsQuery, [startDate, endDate]);

    // Consulta para contar a quantidade de ocorrências de cada status (reserved)
    const reservedCountsQuery = `
      SELECT COUNT(*) AS count
      FROM mobile_stock
      WHERE created_at BETWEEN ? AND ?
      AND status = 'reserved';
    `;
    const reservedCounts = await knex.raw(reservedCountsQuery, [startDate, endDate]);

    res.json({
      inStockCounts: inStockCounts.rows[0].count,
      outOfStockCounts: outOfStockCounts.rows[0].count,
      reservedCounts: reservedCounts.rows[0].count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar dados no banco de dados.' });
  }
};
