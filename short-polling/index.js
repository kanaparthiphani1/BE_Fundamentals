const express = require("express");
const app = express();

let jobs = {};

app.post("/", (req, res) => {
  const jobId = `job${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.json({ jobId: jobId });
});

app.get("/status/:id", (req, res) => {
  const jobId = req.params.id;
  res.json({ status: jobs[jobId] });
});

function updateJob(jobId, per) {
  jobs[jobId] = per;
  console.log(`updated ${jobId} to ${per}`);
  if (per == 100) return;
  setTimeout(() => updateJob(jobId, per + 10), 2000);
}

app.listen(3000, () => console.log("Server Started"));
