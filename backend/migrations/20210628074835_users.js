exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("wallet_id").unique();
    table.string("name");
    table.json("profile_pic");
    table.string("description");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
