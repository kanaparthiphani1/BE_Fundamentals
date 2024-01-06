const express = require("express");
const app = express();

let jobs = {};

app.post("/", (req, res) => {
  const jobId = `job${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  return res.json({ jobId: jobId });
});

app.get("/status/:id", async (req, res) => {
  const jobId = req.params.id;
  while ((await checkStatus(jobId)) === false);
  return res.json({ status: jobs[jobId] });
});

function updateJob(jobId, per) {
  jobs[jobId] = per;
  console.log(`updated ${jobId} to ${per}`);
  if (per == 100) return;
  setTimeout(() => updateJob(jobId, per + 10), 2000);
}

function checkStatus(jobId) {
  return new Promise((res, rej) => {
    if (jobs[jobId] < 100) {
      setTimeout(() => res(false), 2000);
    } else {
      res(true);
    }
  });
}

app.listen(3000, () => console.log("Server Started"));
