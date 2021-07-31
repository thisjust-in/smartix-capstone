const { Socket } = require("node:dgram");

let broadcasters = {};

// express routing
// app.use(express.static("public"));

// signaling
function socket(io) {
  io.on("connection", function (socket) {
    console.log("some connected");
    socket.on("register as broadcaster", function (room) {
      broadcasters[room] = socket.id;

      socket.join(room);
      console.log("Join a room");
    });

    socket.on("register as viewer", function (user) {
      if (Object.keys(broadcasters)[0] === user.room) {
        console.log("register as viewer");
        user.id = socket.id;
        socket.join(user.room);
        socket.to(broadcasters[user.room]).emit("new viewer", user);
        console.log("viewer");

        socket.on("disconnect", () => {
          socket.to(broadcasters[user.room]).emit("user-disconnected", user);
        });
      } else {
        socket.emit("host-not-streaming");
      }
    });

    socket.on("candidate", function (id, event) {
      console.log("sending ice candidate");
      socket.to(id).emit("candidate", socket.id, event);
      console.log("sent ice candidate");
    });

    socket.on("offer", function (id, event) {
      console.log("sending offer");
      event.broadcaster.id = socket.id;
      socket.to(id).emit("offer", event.broadcaster, event.sdp);

      console.log("sent offer");
    });

    socket.on("answer", function (event) {
      console.logg("answer~~~~");
      socket.to(broadcasters[event.room]).emit("answer", socket.id, event.sdp);
      console.log("answered");
    });
  });
}

module.exports = socket;
