const tableName = "palettes";

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.integer("r").notNullable();
    table.integer("g").notNullable();
    table.integer("b").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
