require("dotenv").config({
  path: "../.env",
});
const knexFile = require("../knexfile").development;
const knex = require("knex")(knexFile);

class Method {
  constructor(knex) {
    this.knex = knex;
  }

  async storeWalletId(wallet_id) {
    console.log(wallet_id);
    let exisitingUser = await knex("users").where("wallet_id", wallet_id);
    if (!exisitingUser[0]) {
      return knex("users").returning("id").insert({
        wallet_id: wallet_id,
      });
    }
  }

  //users

  async getUserInfo(id) {
    let data = await knex("users").where("id", id);
    return data;
  }

  async getUserfromAddress(id) {
    let data = await this.knex.select("*").from("users").where("wallet_id", id);
    if (data[0]) {
      return data[0].id;
    }
  }

  async editUserInfo(name, profile_pic, description) {
    await knex("users")
      .update({
        name: name,
        profile_pic: profile_pic,
        description: description,
      })
      .where("id", id);
  }

  //events

  async getUserID(name) {
    if (name) {
      let ids = [];
      let data = await knex
        .select("*")
        .from("users")
        .where("username", "ilike", `%${name}%`);
      for (let each of data) {
        ids.push(each.id);
      }
      return ids;
    } else {
      return [];
    }
  }

  async getEventList(location, event_date, query) {
    let ids = await this.getUserID(query);
    let data = await knex
      .select(
        "event.*",
        "users.*",
        "event.id as event_id",
        "users.id as users_id"
      )
      .from("event")
      .innerJoin("users", "event.users_id", "users.id")
      .modify((qb) => {
        location
          ? qb.where("eventLocation", "ilike", `%${location}%`)
          : qb.whereNotNull("eventLocation");
      })
      .modify((qb) => {
        event_date
          ? qb.where("eventDate", event_date)
          : qb.whereNotNull("eventDate");
      })
      .modify((qb) => {
        query
          ? qb
              .whereIn("users_id", ids)
              .orWhere("eventType", "ilike", `%${query}%`)
          : qb.whereNotNull("users_id");
      });
    return data;
  }

  async findContractAddress(id) {
    let contractAddress = await this.knex
      .select("*")
      .from("event")
      .where("users_id", id)
      .orderBy("event.id", "desc");
    return contractAddress[0];
  }

  async getEventInfo(id) {
    let data = await knex.select("*").from("event").where("event.id", id);
    return data;
  }

  async createEvent(
    eventName,
    contractAddress,
    eventLocation,
    eventPhoto,
    eventDescription,
    eventDate,
    startTime,
    endTime,
    eventCapacity,
    venue,
    eventType,
    isOnline,
    users_id
  ) {
    console.log("inserting now from service class");
    let newEvent = {
      eventName: eventName,
      eventLocation: eventLocation,
      contractAddress: contractAddress,
      eventPhoto: eventPhoto.slice(1, -1),
      eventDescription: eventDescription,
      eventDate: eventDate,
      startTime: startTime,
      endTime: endTime,
      eventCapacity: eventCapacity,
      venue: venue,
      eventType: eventType,
      isOnline: isOnline,
      users_id: users_id,
    };
    let insertEvent = await knex("event")
      .insert(newEvent)
      .then(() => {
        console.log("inserted new Event");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  // for event card, will store into redux named 'eventCard'
  async getEventHost() {
    let eventHost = await this.knex
      .from("users")
      .innerJoin("event", "event.users_id", "users.id")
      .select()
      .orderBy("event.id", "desc")
      .where("eventDate", ">=", new Date());
    return eventHost;
  }

  //Purchase
  async purchaseRecord(TixDetails, wallet_id, contractAddress) {
    let users_id = await knex
      .select("id")
      .from("users")
      .where("wallet_id", wallet_id.toLowerCase());
    let event_id = await knex
      .select("id")
      .from("event")
      .where("contractAddress", contractAddress.toLowerCase());
    await knex("purchase_record").insert({
      TixDetails: TixDetails,
      users_id: users_id[0].id,
      event_id: event_id[0].id,
    });
  }

  //(customer user id), (event id)
  async getPurchaseRecord(wallet_id, event_id) {
    let users_id = await knex
      .select("id")
      .from("users")
      .where("wallet_id", wallet_id.toLowerCase());
    if (users_id[0]) {
      let data = await knex("purchase_record")
        .select("*")
        .where("users_id", users_id[0].id)
        .andWhere("event_id", event_id);
      return data;
    }
    return null;
  }

  async getAllPurchaseRecord(userId) {
    let purchaseRecord = await this.knex
      .select()
      .from("purchase_record")
      .where("users_id", userId);
    return purchaseRecord;
  }

  async setEmailAddress(id, email) {
    try {
      let result = await knex("users").where("id", id).update({ email: email });
    } catch (error) {
      console.log("error", error);
    }
  }

  async setUsername(id, username) {
    try {
      let result = await knex("users")
        .where("id", id)
        .update({ username: username });
    } catch (error) {
      console.log("error", error);
    }
  }

  async setProfilePic(id, photo) {
    try {
      let result = await knex("users")
        .where("id", id)
        .update({ userProfile_pic: photo });
      // console.log(result);
      return result;
    } catch (error) {
      console.log("error", error);
    }
  }
}

module.exports = Method;
