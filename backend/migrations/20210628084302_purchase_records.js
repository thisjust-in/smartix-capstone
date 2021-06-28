exports.up = function (knex) {
    return knex.schema.createTable("purchase_record", (table) => {
      table.increments().primary();
      table.integer("quantity");
      table.string("from_address");
      table.string("to_address");
      table.integer("users_id").unsigned();
      table.foreign("users_id").references("users.id");
      table.integer("events_id").unsigned();
      table.foreign("events_id").references("events.id");
      table.integer("tokens_id").unsigned();
      table.foreign("tokens_id").references("tokens.id");
      table.timestamps(false, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("purchase_record");
  };
  
