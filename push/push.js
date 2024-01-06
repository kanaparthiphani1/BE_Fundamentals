const http = require("http");
const WebsocketServer = require("websocket").server;

const httpServer = http.createServer();

const websocket = new WebsocketServer({ httpServer: httpServer });

let connections = [];

httpServer.listen(3000, () => {
  console.log("Server Started");
});

websocket.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  connection.on("message", (message) => {
    connections.forEach((c) =>
      c.send(`User ${connection.socket.remotePort} says : ${message.utf8Data}`)
    );
  });

  connections.push(connection);
  console.log(connections);

  connections.forEach((c) =>
    c.send(`User${connection.socket.remotePort} just connected.`)
  );
});
