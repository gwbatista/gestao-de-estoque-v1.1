const knex = require('knex')(require('../knexfile'));

async function seedProducts() {
  try {
    // Produtos a serem inseridos
    const products = [
      {
        item: '001',
        description: 'iPhone 13 Pro',
        status: 'in_stock',
        type: 'smartphone'
      },
      {
        item: '002',
        description: 'Samsung Galaxy S21',
        status: 'in_stock',
        type: 'smartphone'
      },
      {
        item: '003',
        description: 'Google Pixel 6',
        status: 'out_of_stock',
        type: 'smartphone'
      },
      {
        item: '004',
        description: 'OnePlus 9',
        status: 'reserved',
        type: 'smartphone'
      },
      {
        item: '005',
        description: 'Xiaomi Mi 11',
        status: 'in_stock',
        type: 'smartphone'
      }
    ];

    // Inserir produtos no banco de dados
    await knex('mobile_stock').insert(products);

    console.log('Produtos inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir produtos:', error);
  } finally {
    // Encerrar conexão com o banco de dados
    knex.destroy();
  }
}

seedProducts();