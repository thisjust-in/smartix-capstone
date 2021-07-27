exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("wallet_id");
    table.string("username");
    table.string("userProfile_pic");
    table.string("email");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
