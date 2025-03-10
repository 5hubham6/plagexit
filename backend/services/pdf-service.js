const pdf = require("pdf-parse");
const fs = require("fs");

exports.processPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error("Failed to process PDF");
  }
};
