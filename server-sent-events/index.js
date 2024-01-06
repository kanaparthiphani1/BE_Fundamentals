const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("HII"));

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  send(res);
});

app.listen(3000, () => {
  console.log("Srever started");
});

let i = 0;
function send(res) {
  res.write("data: " + `hello from server - [${i++}]\n\n`);

  setTimeout(() => send(res), 2000);
}
