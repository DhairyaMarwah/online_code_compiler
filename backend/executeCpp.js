const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "output");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filepath, input) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}`);
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    let elapsedTime = 0;
    let memoryUsage = 0;
    console.log(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId} && ${input}`
    );
    const program = exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId} `,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ stderr });
        resolve({ elapsedTime, stdout, memoryUsage });
      }
    );
    program.stdin.write(input);
    program.stdin.end();
    program.on("exit", () => {
      const endTime = process.hrtime(startTime);
      elapsedTime = endTime[0] + endTime[1] / 1e9;
      memoryUsage = process.memoryUsage();
      const memoryUsageMb = {
        rss: (memoryUsage.rss / 1048576).toFixed(2),
        heapTotal: (memoryUsage.heapTotal / 1048576).toFixed(2),
        heapUsed: (memoryUsage.heapUsed / 1048576).toFixed(2),
        external: (memoryUsage.external / 1048576).toFixed(2),
      };
      console.log(memoryUsageMb);
      console.log(`Execution time: ${elapsedTime} seconds`);
    });
  });
};

module.exports = {
  executeCpp,
};
