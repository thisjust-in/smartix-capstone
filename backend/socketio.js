const { Socket } = require("node:dgram");

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
      if (Object.keys(broadcasters)[0] === user.room) {
        user.id = socket.id;
        socket.join(user.room);
        socket.to(broadcasters[user.room]).emit("new viewer", user);

        socket.on("disconnect", () => {
          socket.to(broadcasters[user.room]).emit("user-disconnected", user);
        });
      } else {
        console.log("room does not ");
        socket.emit("host-not-streaming");
      }
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
