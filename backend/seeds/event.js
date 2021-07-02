exports.seed = function (knex) {
  return knex('events').del()
    .then(function () {
      return knex('events').insert([{
        name: 'Jay Chou 2021',
        location: 'Hong Kong AsiaWorld-Expo',
        Event_picture: {"pc1": 'https://i.pinimg.com/originals/1f/27/a4/1f27a40bfd45769b24e51321995b39d6.jpg'},
        description: "Best Jay Chou will be making his highly-anticipated return to Singapore for Jay Chou Carnival World Tour!",
        event_date: new Date('12/12/2021'),
        capacity: 5000,
        event_type: 'Musical Event',
        isOnline: false,
        users_id: 1
      }, {
        name: 'Coldplay 2021',
        location: 'Disney Hong Kong',
        Event_picture: {"pc1": 'https://mediabank.sportshub.com.sg/s3fs-public/2019-08/sportshubtix%20Event%20Details%20Page%20Banner-770x425%28REV04%29.jpg?TgzNebI1CwLPzAQaZnSl8pK5urKUREcN'},
        description: "Now in its eleventh year, the annual iHeartRadio Music Festival is a two-day music festival in Las Vegas that features today's biggest names - across genres and formats.",
        event_date: new Date('12/09/2021'),
        capacity: 7000,
        event_type: 'Musical Event',
        isOnline: false,
      }
     ]);
    });
};