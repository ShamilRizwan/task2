const path = require('path');
const { processFiles } = require('./src/parseCsv');
const { writeCSV, writeJSONCounts } = require('./src/filewriter');

// Function to determine product condition based on descriptions
const determineCondition = (shortDescription, longDescription) => {
    const keywords = ["refurb", "renew", "remanufactured", "recertified"];
    
    if (checkWordsExist(shortDescription, keywords) || checkWordsExist(longDescription, keywords)) {
        return "Renew";
    } else if (checkWordsExist(shortDescription, ["remanufactured", "recertified"]) || checkWordsExist(longDescription, ["remanufactured", "recertified"])) {
        return "Renew";
    } else {
        return "New";
    }
}

// Function to check if any of the specified words exist in a given text
const checkWordsExist = (text, words) => {
    return words.some(word => text.toLowerCase().includes(word));
}

// Folder path
const folderPath = path.join(__dirname, 'data');

// Extract product data
const products = processFiles(folderPath);

// Determine conditions for each product
products.forEach(product => {
    product.condition = determineCondition(product.shortDescription, product.longDescription);
});

// Creating CSV and JSON files 
writeCSV([['SKU', 'Short Description', 'Long Description', 'Condition'], ...products.map(product => [product.sku, product.shortDescription, product.longDescription, product.condition])]);
writeJSONCounts(products);

console.log('Processing completed. CSV and JSON files generated.');
