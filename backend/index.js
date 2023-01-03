const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executeJava } = require("./executeJava");
const { executeNode } = require("./executeNode");
const { executePy } = require("./executePy");
const app = express();
const port = 8000;
const corsOptions = {
  origin: "*", //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code, input = "1" } = req.body;
  console.log(language, code, input);
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }
  let job;
  try {
    const { filepath } = await generateFile(language, code);
    console.log("demo", filepath);

    let output;
    if (language === "cpp") {
      output = await executeCpp(filepath, input);
      console.log(output);
    } else if (language === "py") {
      output = await executePy(filepath, input);
    } else if (language === "java") {
      output = await executeJava(filepath, input);
    } else if (language === "js") {
      output = await executeNode(filepath, input);
    }
    console.log(output);
    if (output) {
      fs.unlink(filepath, (err) => {
        if (err) console.log(err);
        else console.log("deleted");
      });
    }
    return res.json({ output });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ err });
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
