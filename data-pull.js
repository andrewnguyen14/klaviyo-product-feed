const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const spreadsheetId = process.env.SPREADSHEET_ID;
const apiKey = process.env.API_KEY;
const sheetName = 'Sheet1';

const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

axios.get(apiUrl)
  .then(response => {
	const values = response.data.values;
	if (values.length > 0) {
	  const headers = values[0];
	  const jsonData = values.slice(1).map(row => {
		return headers.reduce((obj, header, index) => {
		  obj[header] = row[index];
		  return obj;
		}, {});
	  });

	  // Convert JSON data to a string
	  const jsonString = JSON.stringify(jsonData, null, 2);

	  // Specify the file path where you want to save the JSON file
	  const filePath = 'product-feed.json';

	  // Write the JSON data to the file
	  fs.writeFileSync(filePath, jsonString);

	  console.log('JSON data has been written to', filePath);
	} else {
	  console.log('No data found.');
	}
  })
  .catch(error => {
	console.error('Error retrieving data:', error.message);
  });
