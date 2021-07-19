exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("wallet_id");
    table.string("username");
    table.json("userProfile_pic");
    table.string("userDescription");
    table.json("purchaseHistory");
    table.foreign("event_id").references("event.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
