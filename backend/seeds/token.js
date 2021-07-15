exports.seed = function (knex) {
  return knex("tokens")
    .del()
    .then(function () {
      return knex("tokens").insert([
        {
          tokenName: "0",
          tokenPrice: 1,
          tokenQuantity: 1000,
          event_id: 1,
        },
        {
          tokenName: "0",
          tokenPrice: 1,
          tokenQuantity: 1000,
          event_id: 2,
        },
        {
          tokenName: "0",
          tokenPrice: 1,
          tokenQuantity: 1000,
          event_id: 3,
        },
        {
          tokenName: "0",
          tokenPrice: 1,
          tokenQuantity: 1000,
          event_id: 4,
        },
      ]);
    });
};
