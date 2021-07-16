let broadcasters = {};

// express routing
// app.use(express.static("public"));

// signaling
function socket(io) {
  io.on("connection", function (socket) {
    console.log("a user connected");

    socket.on("register as broadcaster", function (room) {
      console.log("register as broadcaster for room", room);

      broadcasters[room] = socket.id;
      console.log("broadcasters", broadcasters);
      socket.join(room);
    });

    socket.on("register as viewer", function (user) {
      console.log("register as viewer for room", user.room);

      socket.join(user.room);
      user.id = socket.id;
      // console.log(user.room, broadcasters[user.room]);
      // send to that particular room (broadcasters[user.room])
      // then emit: call the "new viewer" in frontend
      socket.to(broadcasters[user.room]).emit("new viewer", user);
    });

    socket.on("candidate", function (id, event) {
      socket.to(id).emit("candidate", socket.id, event);
    });

    socket.on("offer", function (id, event) {
      event.broadcaster.id = socket.id;
      socket.to(id).emit("offer", event.broadcaster, event.sdp);
    });

    socket.on("answer", function (event) {
      socket.to(broadcasters[event.room]).emit("answer", socket.id, event.sdp);
    });
  });
}

module.exports = socket;