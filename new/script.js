
// Function to load JSON data from a file
async function loadJSONFromFile() {
    try {
        const response = await fetch('courses.json'); // Replace 'your-json-file.json' with the actual file path.
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

// Function to handle course selection and removal from dropdown
function handleCourseSelection(event) {
    const selectedCourse = event.target.value; // Get the selected course name

    // Check if the selected course has already been chosen
    const selectedCoursesList = document.getElementById('selected-courses-list');
    const selectedCourseItems = selectedCoursesList.getElementsByTagName('li');

    for (const item of selectedCourseItems) {
        if (item.textContent === selectedCourse) {
            alert('You have already selected this course.'); // Display a message or take another action if desired
            event.target.value = ''; // Clear the dropdown selection
            return; // Exit the function if the course is already selected
        }
    }

    if (selectedCourse !== '') {
        // Create a new list item to display the selected course
        const listItem = document.createElement('li');
        listItem.textContent = selectedCourse;

        // Create a button to delete the selected course
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger btn-sm ml-2';

        // Add an event listener to the delete button
        deleteButton.addEventListener('click', () => {
            handleCourseDeletion(selectedCourse);
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        // Append the list item to the selected courses list
        selectedCoursesList.appendChild(listItem);

        // Clear the dropdown selection to prevent duplication
        event.target.value = '';
    }
}

// ... Rest of your code ...


// Function to handle course deletion
function handleCourseDeletion(courseName) {
    // Remove the course from the selected courses list
    const selectedCoursesList = document.getElementById('selected-courses-list');
    const selectedCourseItems = selectedCoursesList.getElementsByTagName('li');

    let courseFound = false; // Flag to track if the course is found

    for (const item of selectedCourseItems) {
        if (item.textContent === courseName) {
            selectedCoursesList.removeChild(item);
            courseFound = true; // Set the flag to true if the course is found
            break; // Exit the loop once the course is removed
        }
    }

    if (!courseFound) {
        alert(`Course "${courseName}" not found in the selected courses list.`);
    }

    // Add the deleted course back to the dropdown
    const dropdown = document.getElementById('course-dropdown');
    const option = document.createElement('option');
    option.value = courseName;
    option.textContent = courseName;
    dropdown.appendChild(option);
}


// Event listener to populate the dropdown on page load
window.addEventListener('load', populateDropdown);

// Event listener to handle course selection
document.getElementById('course-dropdown').addEventListener('change', handleCourseSelection);

// Event listener to handle course deletion (implement as a button click event)
document.getElementById('delete-button').addEventListener('click', () => {
    const selectedCoursesList = document.getElementById('selected-courses-list');
    const selectedCourseItems = selectedCoursesList.getElementsByTagName('li');

    if (selectedCourseItems.length === 0) {
        alert('No selected courses to delete.'); // Display a message if no courses are selected
    } else {
        // Prompt the user to select a course to delete
        const courseToDelete = prompt('Enter the name of the course to delete:');

        if (courseToDelete) {
            handleCourseDeletion(courseToDelete.trim()); // Trim to remove leading/trailing spaces
        }
    }
});
// Example: document.getElementById('delete-button').addEventListener('click', handleCourseDeletion);




// ... Rest of your code ...

// Event listener to populate the dropdown on page load
window.addEventListener('load', populateDropdown);

// ... Rest of your event listeners ...
