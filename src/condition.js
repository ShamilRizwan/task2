const fs = require('fs');
const path = require('path');

// Function to process a single line from the file
const processLine = (line, encounteredSKUs) => {
    // Remove leading pipe "|"
    line = line.trim().replace(/^\|/, '');

    const [sku, shortDescription, longDescription] = line.split('~');
    if (sku && shortDescription && longDescription && !encounteredSKUs.has(sku.trim())) {
        encounteredSKUs.add(sku.trim());
        return { sku: sku.trim(), shortDescription: shortDescription.trim(), longDescription: longDescription.trim() };
    }
    return null;
};

// Function to process a single file
const processFile = (filePath, encounteredSKUs) => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.trim().split('\n');
    const products = lines.map(line => processLine(line, encounteredSKUs)).filter(Boolean);
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
