
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          wallet_id: "123455",
          username: "Jay Chou",
          userProfile_pic: {
            "pc1": "https://static.wikia.nocookie.net/cpop/images/b/b3/Jay_Chou.png/revision/latest?cb=20200407050501",
          },
          userDescription: "I am Jay Chou",
        },
        {
          id: 2,
          wallet_id: "246810",
          username: "Coldplay",
          userProfile_pic: {
            "pc1": "https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2560%2Cc_limit/coldplay.jpg",
          },
          userDescription: "We are Coldplay",
        },
      ]);
    });
};
