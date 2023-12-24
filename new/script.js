
// Function to load JSON data from a file
async function loadJSONFromFile() {
    try {
        const response = await fetch('your-json-file.json'); // Replace 'your-json-file.json' with the actual file path.
        if (!response.ok) {
            throw new Error('Failed to load JSON data.');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Function to populate the course dropdown
async function populateDropdown() {
    const dropdown = document.getElementById('course-dropdown');
    const jsonData = await loadJSONFromFile();

    // Iterate through the JSON data and create option elements
    for (const courseName in jsonData) {
        const option = document.createElement('option');
        option.value = courseName;
        option.textContent = courseName;
        dropdown.appendChild(option);
    }
}

// Function to handle course selection
function handleCourseSelection(event) {
    // Logic to handle course selection and removal from dropdown
}

// Function to handle course deletion
function handleCourseDeletion(courseName) {
    // Logic to handle course deletion and adding it back to the dropdown
}

// Event listener to populate the dropdown on page load
window.addEventListener('load', populateDropdown);

// Event listener to handle course selection
document.getElementById('course-dropdown').addEventListener('change', handleCourseSelection);

// Event listener to handle course deletion (you can implement this as a button click event)
// Example: document.getElementById('delete-button').addEventListener('click', handleCourseDeletion);




// ... Rest of your code ...

// Event listener to populate the dropdown on page load
window.addEventListener('load', populateDropdown);

// ... Rest of your event listeners ...
