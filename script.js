fetch('courses.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(coursesData => {
        populateCourseDropdown(coursesData);
    })
    .catch(error => {
        console.error('Error loading course data:', error);
        // Display an error message to the user
        displayErrorMessage('Failed to load course data. Please try again later.');
    });


function populateCourseDropdown(coursesData) {
    const courseDropdown = document.getElementById('courseDropdown');
    coursesData.forEach(course => {
        let option = document.createElement('option');
        option.value = course.title;
        option.textContent = course.title;
        courseDropdown.appendChild(option);
    });

    // Initial population of time slots
    if (courseDropdown.options.length > 0) {
        populateTimeSlotDropdown(coursesData, courseDropdown.value);
    }

    // Event listener for course selection change
    courseDropdown.addEventListener('change', (event) => {
        populateTimeSlotDropdown(coursesData, event.target.value);
    });
}

function populateTimeSlotDropdown(coursesData, selectedCourseTitle) {
    const timeSlotDropdown = document.getElementById('timeSlotDropdown');
    timeSlotDropdown.innerHTML = ''; // Clear previous options

    const selectedCourse = coursesData.find(course => course.title === selectedCourseTitle);
    selectedCourse.sections.forEach(section => {
        let option = document.createElement('option');
        option.value = JSON.stringify(section); // Stringify to store the entire object
        option.textContent = `${section.days} ${section.time} - ${section.instructor}`;
        timeSlotDropdown.appendChild(option);
    });
}

// ... Existing event form submission and other functionalities ...


document.addEventListener('DOMContentLoaded', function () {
    const courses = [];
    const eventForm = document.getElementById('eventForm');
    const globalSettingsForm = document.getElementById('globalSettings');
    const eventList = document.getElementById('eventList');
    const generateICSButton = document.getElementById('generateICS');

   eventForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Example: Validating course name
    const courseName = document.getElementById('courseName').value;
    if (!courseName) {
        displayErrorMessage('Please enter a course name.');
        return;
    }
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
    try {
        let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your App//EN\n';


    courses.forEach(course => {
        const startDate = formatDateToICS(course.startDate);
        const endDate = formatDateToICS(course.endDate);

        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `SUMMARY:${course.name}\n`;
        icsContent += `DTSTART;VALUE=DATE:${startDate}\n`;
        icsContent += `DTEND;VALUE=DATE:${endDate}\n`;
        icsContent += 'RRULE:FREQ=WEEKLY\n'; // Assuming weekly repetition
        // Add other iCalendar fields as necessary
        icsContent += 'END:VEVENT\n';
    });

    icsContent += 'END:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'schedule.ics';
    link.click();
 catch (error) {
    console.error('Error generating ICS file:', error);
    displayErrorMessage('Failed to generate ICS file. Please try again.');
}
}

function formatDateToICS(dateString) {
    // Convert date from 'YYYY-MM-DD' to 'YYYYMMDD' format for iCalendar
    return dateString.replace(/-/g, '');
}

});
