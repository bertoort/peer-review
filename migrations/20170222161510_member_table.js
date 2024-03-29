
exports.up = function(knex, Promise) {
  return knex.schema.createTable('member', function(table) {
    table.uuid('id').notNullable().primary();
    table.string('name');
    table.uuid('team_id').references('id').inTable('team').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('member');
};
