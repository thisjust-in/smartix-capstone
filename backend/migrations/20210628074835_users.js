exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("wallet_id").unique();
    table.string("username");
    table.json("userProfile_pic");
    table.string("userDescription");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
