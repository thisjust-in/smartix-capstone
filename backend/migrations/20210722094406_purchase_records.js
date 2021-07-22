exports.up = function (knex) {
  return knex.schema.createTable("purchase_record", (table) => {
    table.increments().primary();
    table.json("TixDetails");
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.integer("event_id").unsigned();
    table.foreign("event_id").references("event.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("purchase_record");
};
