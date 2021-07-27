exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          wallet_id: "0x990aa5B4B6934D64DC51B0FFD7C5CF0989CEEaD9",
          username: "Angy Linner",
          userProfile_pic: null,
          email: "alinner0@themeforest.net",
        },
        {
          wallet_id: "0x6BAa48911A3dF4b13A5D24952bc3222E01Cb53f4",
          username: "Harrison Tiner",
          userProfile_pic: null,
          email: "htiner1@reddit.com",
        },
        {
          wallet_id: "0xBA8Ae66f93791C38BA638857a5684963E151Ad34",
          username: "Laureen Manie",
          userProfile_pic: null,
          email: "lmanie2@163.com",
        },
        {
          wallet_id: "0xAb451aeD6AcA6bF97249c9453A7cF657A7DAE36E",
          username: "Niel Frunks",
          userProfile_pic: null,
          email: "nfrunks3@latimes.com",
        },
        {
          wallet_id: "0x03b1577A253A5c82CB4f27A230DC34C6bB25801C",
          username: "Charleen Cometto",
          userProfile_pic: null,
          email: "ccometto4@sciencedaily.com",
        },
        {
          wallet_id: "0xcFC5db66400fCE0EA1E50ff123Cf6959A769AAFD",
          username: "Nataniel Jewsbury",
          userProfile_pic: null,
          email: "njewsbury5@cafepress.com",
        },
        {
          wallet_id: "0x491D0702E7dd9834FBf29E457EEf61dB6BD0EC91",
          username: "Jeffrey Josifovic",
          userProfile_pic: null,
          email: "jjosifovic6@instagram.com",
        },
        {
          wallet_id: "0x4cE495C1366AcCa1668fA5f8C52eff077B403119",
          username: "Arlene Beardow",
          userProfile_pic: null,
          email: "abeardow7@hud.gov",
        },
        {
          wallet_id: "0x522Bf684EFB2C0547e8865EBdE93303F10899E78",
          username: "Elvera Powelee",
          userProfile_pic: null,
          email: "epowelee8@sphinn.com",
        },
        {
          wallet_id: "0x1F6B5B76cA102020c042151a9063132A1a6c9b3b",
          username: "Caroljean Cauderlie",
          userProfile_pic: null,
          email: "ccauderlie9@washingtonpost.com",
        },
      ]);
    });
};
