exports.up = function (knex) {
  return knex.schema.createTable("event", (table) => {
    table.increments().primary();
    table.string("eventName");
    table.string("eventLocation");
    table.json("eventPhoto");
    table.string("eventDescription");
    table.datetime("eventDate");
    table.integer("eventCapacity");
    table.string("eventType");
    table.boolean("isOnline");
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.timestamps(false, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("event");
};
