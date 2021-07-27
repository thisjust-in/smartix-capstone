exports.seed = function (knex) {
  return knex("event")
    .del()
    .then(function () {
      return knex("event").insert([
        {
          eventName: "Coding Interview Prep",
          contractAddress: "0xff57abade2be75295468412507e98fd0fea66ff9",
          eventLocation: "Haiti",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366927/icons/christopher-gower-m_HRfLhgABo-unsplash_nxr0x0.jpg",
          eventDescription:
            "We get it: Your dreams of becoming a full-fledged software engineer await you on the other side, but you want to know more about what to expect before you enter the interview room and start solving problems.",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 562,
          venue: "Hong Kong Coliseum",
          eventType: "seminar",
          isOnline: false,
          users_id: 10,
        },
        {
          eventName: "Yoga Sunday's",
          contractAddress: "0x8ad47edc4f104c79e9aab0ddd6fbe89e0d9447b2",
          eventLocation: "Kazakhstan",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366928/icons/carl-barcelo-nqUHQkuVj3c-unsplash-min_g0dfg5.jpg",
          eventDescription:
            "Yoga is a mind-body practice that combines physical poses, controlled breathing, and meditation or relaxation. Yoga may help reduce stress, lower blood pressure and lower your heart rate. And almost anyone can do it.",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 562,
          venue: "Hong Kong Coliseum",
          eventType: "well-being",
          isOnline: false,
          users_id: 1,
        },
        {
          eventName:
            "Industry Masterclass in AI for Learners in Western Europe",
          contractAddress: "0x7ebfc798585edc9b0b88b5a8dd86b1e1c00c0523",
          eventLocation: "Russia",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366928/icons/teemu-paananen-bzdhc5b3Bxs-unsplash-min_gn5jhw.jpg",
          eventDescription:
            "Free Online Masterclass in Artificial Intelligent - presented by Huawei ICT Academy Programme in collaboration with University of Reading",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 562,
          venue: "Hong Kong Coliseum",
          eventType: "hobbies",
          isOnline: false,
          users_id: 2,
        },
        {
          eventName:
            "thinkTALK | Game On: Tapping into Gaming and Esports Business",
          contractAddress: "0x986d602d1e1d9ebaf5ae21702c6aaaa4d4280de9",
          eventLocation: "Indonesia",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366929/icons/stem-list-EVgsAbL51Rk-unsplash-min_cxjrb6.jpg",
          eventDescription:
            "WIEF thinkTALK is a virtual session specially designed to empower young changemakers with compelling ideas plus deep knowledge on leadership, business, entrepreneurship and pressing issues from prominent leaders as well as industry experts.",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 897,
          venue: "AsiaWorld-Expo",
          eventType: "entertainment",
          isOnline: false,
          users_id: 2,
        },
        {
          eventName: "Cooking Class: Homemade Lobster Club Sandwich",
          contractAddress: "0x03b1577A253A5c82CB4f27A230DC34C6bB25801C",
          eventLocation: "Thailand",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366928/icons/conscious-design-3D43SBDDkAc-unsplash-min_jb8tbg.jpg",
          eventDescription:
            "Recipe Packet + Login Details: You will receive your recipe packet + Zoom link in your Eventbrite confirmation email, as well as directly from Homemade a few days before the event. Please make sure that emails coming from support@withhomemade.com are not going to your spam folder!",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 2000,
          venue: null,
          eventType: "cooking",
          isOnline: true,
          users_id: 5,
        },
        {
          eventName: "Virtual EDM Party",
          contractAddress: "0xa157dca33967db3abc62efb37f1683ed40eca7de",
          eventLocation: "Jordan",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366928/icons/zachary-smith-DgBNkXB-ckI-unsplash-min_hld9bh.jpg",
          eventDescription:
            "Come and Dance with me! Playing Afrobeats, Hip-hop, R&B and House music.",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 562,
          venue: "Hong Kong Coliseum",
          eventType: "entertainment",
          isOnline: false,
          users_id: 3,
        },
        {
          eventName: "Community Through Clay Workshop Series",
          contractAddress: "0x491D0702E7dd9834FBf29E457EEf61dB6BD0EC91ll",
          eventLocation: "United Arab Emirates",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366931/icons/roman-hinex-3s-D6FZKxAc-unsplash-min_gkye2c.jpg",
          eventDescription:
            "Join us via Zoom to learn traditional hand-building ceramic techniques while creating a unique ceramic project!",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: null,
          venue: "AsiaWorld-Expo",
          eventType: "hobbies",
          isOnline: false,
          users_id: 4,
        },
        {
          eventName: "UPLIFT August Concert 2021",
          contractAddress: "0x7ebfc798585edc9b0b88b5a8dd86b1e1c00c0523",
          eventLocation: "Japan",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627366931/icons/hanny-naibaho-aWXVxy8BSzc-unsplash-min_wlwgbv.jpg",
          eventDescription:
            "Let us lift your spirits with our free UPLIFT concert. Our mix of inspiring musical theatre could be just what your weekend needs.",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 897,
          venue: "AsiaWorld-Expo",
          eventType: "entertainment",
          isOnline: false,
          users_id: 6,
        },
        {
          eventName: "Out in Tech | Gaming",
          contractAddress: "0x32f8c216be5e0f71a0f4854e6da16c286f486791",
          eventLocation: "Bermuda",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627367003/icons/fabio-silva-nmTm7knUnqs-unsplash_ccyekw.jpg",
          eventDescription:
            "Join us for back-to-back conversations with leading experts in the gaming and e-commerce industries to discuss topics like the state of LGBTQ representation in gaming, the role of AI and big data in e-commerce, and much more!",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 562,
          venue: "Hong Kong Coliseum",
          eventType: "entertainment",
          isOnline: false,
          users_id: 7,
        },
        {
          eventName: "Interview Skills Workshop",
          contractAddress: "0x271e12b79fd174ed575cf0e971e6c1cb55b7f379",
          eventLocation: "China",
          eventPhoto:
            "https://res.cloudinary.com/dnq92mpxr/image/upload/v1627367044/icons/sam-mcghee-4siwRamtFAk-unsplash_l1k5a3.jpg",
          eventDescription: "Interview Skills Workshop by JobStart Team",
          eventDate: "2021-07-31 00:00:00",
          startTime: "01:00",
          endTime: "12:30",
          eventCapacity: 897,
          venue: "AsiaWorld-Expo",
          eventType: "educational",
          isOnline: false,
          users_id: 8,
        },
      ]);
    });
};
