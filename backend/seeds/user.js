exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          wallet_id: "123455",
          username: "Jay Chou",
          userProfile_pic: {
            pc1: "https://i.pinimg.com/originals/1f/27/a4/1f27a40bfd45769b24e51321995b39d6.jpg",
          },
          userDescription: "I am Jay Chou",
        },
        {
          id: 2,
          wallet_id: "246810",
          username: "Coldplay",
          userProfile_pic: {
            pc1: "https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2560%2Cc_limit/coldplay.jpg",
          },
          userDescription: "We are Coldplay",
        },
        {
          id: 3,
          wallet_id: "sdffsdf3342432432423",
          username: "The Point",
          userProfile_pic: {
            pc1: "https://image.flaticon.com/icons/png/512/119/119958.png",
          },
          userDescription: "We are the Point",
        },
      ]);
    });
};
