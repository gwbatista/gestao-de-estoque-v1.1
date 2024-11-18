exports.up = function(knex) {
  return knex.schema.createTable('mobile_stock', function(table) {
    table.increments('id').primary();
    table.string('item').notNullable();
    table.string('description').notNullable();
    table.string('status').notNullable();
    table.string('type').notNullable();
    table.timestamps(true, true); // Cria colunas created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('mobile_stock');
};