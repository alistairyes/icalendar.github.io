fetch('courses.json')
    .then(response => response.json())
    .then(coursesData => {
        // Use coursesData to populate UI
    })
    .catch(error => console.error('Error loading course data:', error));

document.addEventListener('DOMContentLoaded', function () {
    // Structured course data (abbreviated for brevity)
    const coursesData = {
        "AI Algorithms and Mathematics": [
            { crn: 20863, time: "05:00 pm-08:50 pm", instructor: "Muhammad Sultan", location: "BA_K 324", days: "W" },
            { crn: 20864, time: "06:00 pm-09:50 pm", instructor: "Muhammad Sultan", location: "BA_M 134", days: "R" },
            // ... other time slots ...
        ],
        // ... other courses ...
    };

    // Reference to DOM elements
    const courseDropdown = document.getElementById('courseDropdown');
    const timeSlotDropdown = document.getElementById('timeSlotDropdown');

    // Populate course dropdown
    for (let course in coursesData) {
        let option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseDropdown.appendChild(option);
    }

    // Handle course selection change
    courseDropdown.addEventListener('change', function () {
        populateTimeSlots(this.value);
    });

    // Populate time slots for selected course
    function populateTimeSlots(courseTitle) {
        const timeSlots = coursesData[courseTitle];
        timeSlotDropdown.innerHTML = '';
        timeSlots.forEach(slot => {
            let option = document.createElement('option');
            option.value = JSON.stringify(slot); // Stringify to store the entire object
            option.textContent = `${slot.days} ${slot.time} - ${slot.instructor}`;
            timeSlotDropdown.appendChild(option);
        });
    }

    // Initial population of time slots
    if (courseDropdown.options.length > 0) {
        populateTimeSlots(courseDropdown.options[courseDropdown.selectedIndex].value);
    }

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
}

function formatDateToICS(dateString) {
    // Convert date from 'YYYY-MM-DD' to 'YYYYMMDD' format for iCalendar
    return dateString.replace(/-/g, '');
}

});
