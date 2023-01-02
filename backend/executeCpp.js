const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "output");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}`);
  return new Promise((resolve, reject) => {
    // console.log(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`);
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ stderr });
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
