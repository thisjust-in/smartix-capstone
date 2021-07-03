exports.seed = function (knex) {
  return knex('event').del()
    .then(function () {
      return knex('event').insert([{
        eventName: 'Jay Chou 2021',
        eventLocation: 'Hong Kong AsiaWorld-Expo',
        eventPhoto: {"pc1": 'https://i.pinimg.com/originals/1f/27/a4/1f27a40bfd45769b24e51321995b39d6.jpg'},
        eventDescription: "Best Jay Chou will be making his highly-anticipated return to Singapore for Jay Chou Carnival World Tour!",
        eventDate: new Date('July 19, 2021 08:30:00'),
        eventCapacity: 5000,
        eventType: 'Musical Event',
        isOnline: false,
        users_id: 1
      }, {
        eventName: 'Coldplay 2021',
        eventLocation: 'Disney Hong Kong',
        eventPhoto: {"pc1": 'https://mediabank.sportshub.com.sg/s3fs-public/2019-08/sportshubtix%20Event%20Details%20Page%20Banner-770x425%28REV04%29.jpg?TgzNebI1CwLPzAQaZnSl8pK5urKUREcN'},
        eventDescription: "Now in its eleventh year, the annual iHeartRadio Music Festival is a two-day music festival in Las Vegas that features today's biggest names - across genres and formats.",
        eventDate: new Date('August 19, 2021 19:00:00'),
        eventCapacity: 7000,
        eventType: 'Consert',
        isOnline: false,
        users_id: 2
      }
     ]);
    });
};