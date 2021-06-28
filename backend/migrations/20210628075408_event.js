exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments().primary();
    table.string("name");
    table.string("location");
    table.json("Event_picture");
    table.string("description");
    table.date("event_date");
    table.integer("capacity");
    table.string("event_type");
    table.boolean("isOnline");
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
