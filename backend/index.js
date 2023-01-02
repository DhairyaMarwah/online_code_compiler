const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const Job = require("./models/Job");
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb://localhost:27017/online-compiler",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else console.log("Connected to DB");
  }
);
const app = express();
const port = 3001;
const corsOptions = {
  origin: "*", //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/status", async (req, res) => {
  const jobId = req.query.id; 
  if (jobId === undefined) {
    return res.status(400).json({ success: false, error: "missing id" });
  }
  try {
    const job = await Job.findById(jobId);
    if (job === undefined) {
      return res.status(400).json({ success: false, error: "invalid id" });
    }

    return res.status(200).json({ success: true, job });
  } catch (err) {
    return res.status(400).json({ success: false, error: JSON.stringify(err) });
  }
});
 
app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  console.log(language, code);
  if (code === undefined) {
     return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  let job;
  try {
    const { filepath } = await generateFile(language, code);
    console.log("demo", filepath);
    job = await new Job({ language, filepath }).save();
    const jobId = job["_id"]; 
    console.log(job);
    res.status(201).json({ success: true, jobId });
    let output;
    job["startedAt"] = new Date();
    if (language === "cpp") {
      output = await executeCpp(filepath);
    } else if (language === "py") {
      output = await executePy(filepath);
    }
    job["completedAt"] = new Date();
    job["status"] = "success";
    await job.save();
    job["output"] = output;
    console.log(job);
    // return res.json({ filepath, output });
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = JSON.stringify(err);
    await job.save();
    console.log(job);
    // console.log(err);

    // return res.status(500).json({ err });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
