const fs = require('fs');
const path = require('path');

const logToFile = (filename, data) => {
    const filePath = path.join(__dirname, '../data', filename);
    const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(data, null, 2)}\n---\n`;

    fs.appendFile(filePath, logEntry, (err) => {
        if (err) console.error(`Error logging to ${filename}:`, err);
    });
};

module.exports = { logToFile };
