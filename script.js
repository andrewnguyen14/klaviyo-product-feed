document.addEventListener('DOMContentLoaded', function () {
  const jsonFilePath = '/product-feed.json';
  fetch(jsonFilePath)
	.then(response => response.json())
	.then(jsonData => {
	  const jsonDataContainer = document.getElementById('jsonDataContainer');

	  // Convert JSON data to a formatted string
	  const jsonString = JSON.stringify(jsonData, null, 2);

	  // Create a <pre> element to preserve formatting
	  const preElement = document.createElement('pre');
	  preElement.textContent = jsonString;

	  // Append the <pre> element to the container
	  jsonDataContainer.appendChild(preElement);
	})
	.catch(error => {
	  console.error('Error retrieving data:', error.message);
	});
});
