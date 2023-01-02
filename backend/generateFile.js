const fs = require("fs");
const path = require("path");
const { v1: uuid } = require("uuid");
const dirCode = path.join(__dirname, "codes");
if (!fs.existsSync(dirCode)) {
  fs.mkdirSync(dirCode, { recursive: true });
}

const generateFile = async (format, content) => {
  const jobId = uuid();
  const fileName = `${jobId}.${format}`;
  const filepath = path.join(dirCode, fileName);
  await fs.writeFileSync(filepath, content);
  return { filepath };
};
module.exports = {
  generateFile,
};
