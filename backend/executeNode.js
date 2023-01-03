const { exec } = require("child_process");
const executeNode = (filepath, input) => {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime();
    let elapsedTime = 0;
    let memoryUsage = 0;
    console.log(`node ${filepath}`);
    const program = exec("node", [{ filepath }]);

    // Print the output
    console.log("stdout:");
    program.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    program.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    program.on("exit", () => {
      console.log(`stdout: ${program.stdout}`);
    });
    // console.log(stdout);
    program.stdin.write(input);
    program.stdin.end();
    program.on("exit", () => {
      const endTime = process.hrtime(startTime);
      elapsedTime = endTime[0] + endTime[1] / 1e9;
      memoryUsage = {
        rss: (memoryUsage.rss / 1048576).toFixed(2),
        heapTotal: (memoryUsage.heapTotal / 1048576).toFixed(2),
        heapUsed: (memoryUsage.heapUsed / 1048576).toFixed(2),
        external: (memoryUsage.external / 1048576).toFixed(2),
      };
      console.log(`Execution time: ${elapsedTime} seconds`);
    });
  });
};

module.exports = {
  executeNode,
};
