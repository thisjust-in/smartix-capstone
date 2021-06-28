exports.up = function (knex) {
  return knex.schema.createTable("tokens", (table) => {
    table.increments().primary();
    table.string("token_name");
    table.decimal("price", 14, 4);
    table.integer("quantity");
    table.integer("events_id").unsigned();
    table.foreign("events_id").references("events.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tokens");
};
