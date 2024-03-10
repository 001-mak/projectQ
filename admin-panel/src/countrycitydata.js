const data = require('./countries+cities.json')
const fs = require('fs');

function writefile(params) {
    
    const filteredData = data.map(({ id, name, cities }) => ({
        id,
    name,
    cities: cities.map(({ id, name }) => ({ id, name })),
  }));
  
  console.log(filteredData);

  // Convert filteredData to JSON format
const jsonData = JSON.stringify(filteredData, null, 2);

// Write JSON data to file
fs.writeFile('citycountryData.json', jsonData, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('Filtered data has been saved.');
});
}

writefile();