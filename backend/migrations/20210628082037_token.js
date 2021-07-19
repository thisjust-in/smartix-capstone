exports.up = function (knex) {
  return knex.schema.createTable("tokens", (table) => {
    table.increments().primary();
    table.decimal("tokenPrice", 14, 4);
    table.integer("tokenQuantity");
    table.integer("event_id").unsigned();
    table.foreign("event_id").references("event.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokens");
};
