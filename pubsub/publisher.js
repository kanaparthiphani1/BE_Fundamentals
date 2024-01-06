const express = require("express");
const app = express();
const amqp = require("amqplib");

app.use(express.json());

let channel;
let connection;
connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("jobs");
  } catch (ex) {
    console.error(ex);
  }
}

app.post("/sendmsg", async (req, res) => {
  const { message } = req.body;
  try {
    await channel.sendToQueue(
      "jobs",
      Buffer.from(JSON.stringify({ data: message }))
    );
    res.json({ status: "sent" });
  } catch (error) {
    console.log("queue error", error);
  }
});

app.listen(3000, () => {
  console.log("Server Started");
});
