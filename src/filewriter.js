const fs = require('fs');

const writeCSV = (csvData) => {
    const csvString = csvData.map(row => row.join(',')).join('\n');
    fs.writeFileSync('report.csv', csvString);
}

const writeJSONCounts = (products) => {
    // Initialize an object to store counts for each condition
    const counts = {};

    // Count the occurrences of each condition
    products.forEach(product => {
        // If the condition is not already counted, initialize its count to 1
        if (!counts[product.condition]) {
            counts[product.condition] = 1;
        } else {
            // Otherwise, increment the count
            counts[product.condition]++;
        }
    });

    // Write counts to a JSON file
    fs.writeFileSync('productCounts.json', JSON.stringify(counts, null, 2));
}

module.exports = { writeCSV, writeJSONCounts };
