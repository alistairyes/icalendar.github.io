document.addEventListener('DOMContentLoaded', function () {
    const courses = [];
    const eventForm = document.getElementById('eventForm');
    const globalSettingsForm = document.getElementById('globalSettings');
    const eventList = document.getElementById('eventList');
    const generateICSButton = document.getElementById('generateICS');

    eventForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const courseName = document.getElementById('courseName').value;
        // Add other fields as needed

        const newCourse = {
            name: courseName,
            startDate: '',  // To be set by global settings
            endDate: '',    // To be set by global settings
            // Add other course details
        };

        courses.push(newCourse);
        displayCourses();
    });

    document.getElementById('applySettings').addEventListener('click', function () {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        courses.forEach(course => {
            course.startDate = startDate;
            course.endDate = endDate;
        });
        displayCourses();
    });

    generateICSButton.addEventListener('click', function () {
        generateICS(courses);
    });

    function displayCourses() {
        eventList.innerHTML = '';
        courses.forEach(course => {
            const courseItem = document.createElement('li');
            courseItem.className = 'list-group-item';
            courseItem.textContent = `${course.name} (${course.startDate} to ${course.endDate})`;
            eventList.appendChild(courseItem);
        });
    }

    function generateICS(courses) {
        // Generate the ics file content based on the courses
        // This function needs to be implemented
    }
});
