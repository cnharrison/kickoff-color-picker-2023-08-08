const tableName = "palettes";
const columnName = "palette_id";

exports.up = function (knex) {
  return knex.schema.alterTable(tableName, function (table) {
    table.uuid(columnName).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable(tableName, function (table) {
    table.dropColumn(columnName);
  });
};

