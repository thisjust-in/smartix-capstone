require("dotenv").config({
  path: "../.env",
});
const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);

class Method {
  constructor(knex) {
    this.knex = knex;
  }

  storeWalletId(wallet_id) {
    console.log(wallet_id);
    return knex("users")
      .insert({
        wallet_id: wallet_id,
      })
      .then(() => {
        console.log("wallet id", wallet_id);
      });
  }

  //users

  async GetUserInfo(id) {
    let data = await knex("users").where("id", id);
    return data;
  }

  async EditUserInfo(name, profile_pic, description) {
    await knex("users")
      .update({
        name: name,
        profile_pic: profile_pic,
        description: description,
      })
      .where("id", id);
  }

  //   async CreateUser(wallet_id, name, profile_pic) {
  //     await knex
  //       .insert({
  //         wallet_id: wallet_id,
  //         name: name,
  //         profile_pic: profile_pic,
  //       })
  //       .into("users");
  //   }

  //events

  async GetEventList(
    location,
    event_date_from,
    event_date_to,
    users_id,
    event_type
  ) {
    let data = await knex
      .select("*")
      .from("events")
      .modify((qb) => {
        location ? qb.where("location", location) : qb.whereNotNull("location");
      })
      .modify((qb) => {
        event_date_from && event_date_to
          ? qb.whereBetween("event_date_from", [event_date_from, event_date_to])
          : qb.whereNotNull("event_date");
      })
      .modify((qb) => {
        users_id ? qb.where("users_id", users_id) : qb.whereNotNull("users_id");
      })
      .modify((qb) => {
        event_type
          ? qb.where("event_type", event_type)
          : qb.whereNotNull("event_type");
      });
    return data;
  }

  async GetEventInfo(id) {
    let data = await knex
      .select("events.*", "tokens.*", "tokens.id as tokens_id")
      .from("events")
      .innerJoin("tokens", "tokens.events_id", "events.id")
      .where("events.id", id);
    return data;
  }

  async CreateEvent(
    name,
    location,
    Event_picture,
    description,
    event_date,
    capacity,
    event_type,
    isOnline,
    users_id,
    token_name,
    price,
    quantity
  ) {
    let events_id = await knex
      .insert({
        name: name,
        location: location,
        Event_picture: Event_picture,
        description: description,
        event_date: event_date,
        capacity: capacity,
        event_type: event_type,
        isOnline: isOnline,
        users_id: users_id,
      })
      .into("events")
      .returning("id");

    await knex
      .insert({
        token_name: token_name,
        price: price,
        quantity: quantity,
        events_id: events_id,
      })
      .into("tokens");
  }

  //puchase record
  async PurchaseRecord(users_id) {
    let data = await knex("purchase_record").where("users_id", users_id);
    return data;
  }
}

module.exports = Method;

// const test = new Method(knex);

// test.storeWalletId(222);
// test.GetUserInfo(1);