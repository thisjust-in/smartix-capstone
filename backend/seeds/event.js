exports.seed = function (knex) {
  return knex("event")
    .del()
    .then(function () {
      return knex("event").insert([
        {
          eventName: "Jay Chou 2021",
          eventLocation: "Hong Kong AsiaWorld-Expo",
          eventPhoto: "https://i.pinimg.com/originals/1f/27/a4/1f27a40bfd45769b24e51321995b39d6.jpg",
          eventDescription:
            "Best Jay Chou will be making his highly-anticipated return to Singapore for Jay Chou Carnival World Tour!",
          eventDate: new Date("July 19, 2022 08:30:00"),
          eventCapacity: 5000,
          eventType: "Musical Event",
          isOnline: false,
          users_id: 1,
        },
        {
          eventName: "Coldplay 2021",
          eventLocation: "Disney Hong Kong",
          eventPhoto: "https://mediabank.sportshub.com.sg/s3fs-public/2019-08/sportshubtix%20Event%20Details%20Page%20Banner-770x425%28REV04%29.jpg?TgzNebI1CwLPzAQaZnSl8pK5urKUREcN",
          eventDescription:
            "Now in its eleventh year, the annual iHeartRadio Music Festival is a two-day music festival in Las Vegas that features today's biggest names - across genres and formats.",
          eventDate: new Date("August 19, 2022 19:00:00"),
          eventCapacity: 7000,
          eventType: "Consert",
          isOnline: false,
          users_id: 2,
        },
        {
          eventName: "Should not show",
          eventLocation: "Disney Hong Kong",
          eventPhoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
          eventDescription:
            "Now in its eleventh year, the annual iHeartRadio Music Festival is a two-day music festival in Las Vegas that features today's biggest names - across genres and formats.",
          eventDate: new Date("July 2, 2022 19:00:00"),
          eventCapacity: 7000,
          eventType: "Consert",
          isOnline: false,
          users_id: 3,
        },
        {
          eventName: "Should not show",
          eventLocation: "Disney Hong Kong",
          eventPhoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
          eventDescription:
            "Now in its eleventh year, the annual iHeartRadio Music Festival is a two-day music festival in Las Vegas that features today's biggest names - across genres and formats.",
          eventDate: new Date("July 2, 2022 19:00:00"),
          eventCapacity: 7000,
          eventType: "Consert",
          isOnline: false,
          users_id: 3,
        },
      ]);
    });
};
