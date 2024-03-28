const fs = require('fs');

const writeJSONCounts = (products) => {
    // Initialize an object to store counts for each condition
    const counts = {};

    // Count the occurrences of each condition
    products.forEach(product => {
        const condition = product.condition;
        counts[condition] = (counts[condition] || 0) + 1;
    });

    // Write counts to a JSON file
    fs.writeFileSync('productCounts.json', JSON.stringify(counts, null, 2));
}

module.exports = { writeJSONCounts };
