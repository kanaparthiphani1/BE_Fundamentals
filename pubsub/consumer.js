const express = require("express");
const app = express();
const amqp = require("amqplib");

let channel;
let connection;
connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Recieved job with input ${input.data}`);

      if (input.number == 7) channel.ack(message);
    });
  } catch (ex) {
    console.error(ex);
  }
}

app.listen(3001, () => {
  console.log("Server Started");
});
