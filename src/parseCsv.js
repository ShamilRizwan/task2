const fs = require('fs');
const path = require('path');

// Function to parse a single line from the file
const parseLine = (line) => {
    // Remove leading pipe "|"
    line = line.trim().replace(/^\|/, '');

    const [sku, shortDescription, longDescription] = line.split('~').map(item => item.trim());
    return { sku, shortDescription, longDescription };
};

// Function to process a single file
const processFile = (filePath, encounteredSKUs) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\n');
    const products = [];

    lines.forEach(line => {
        const { sku, shortDescription, longDescription } = parseLine(line);
        if (sku && shortDescription && longDescription && !encounteredSKUs.has(sku)) {
            products.push({ sku, shortDescription, longDescription });
            encounteredSKUs.add(sku);
        }
    });

    return products;
};

// Function to process files in a folder
const processFiles = (folderPath) => {
    const products = [];
    const encounteredSKUs = new Set();

    fs.readdirSync(folderPath).forEach(filename => {
        if (filename.endsWith('.txt')) {
            const filePath = path.join(folderPath, filename);
            products.push(...processFile(filePath, encounteredSKUs));
        }
    });

    return products;
};

module.exports = { processFiles };
