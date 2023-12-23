document.getElementById('courseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    let course = {
        name: document.getElementById('name').value,
        instructor: document.getElementById('instructor').value,
        location: document.getElementById('location').value,
        start_date: document.getElementById('start_date').value,
        end_date: document.getElementById('end_date').value,
        class_time_start: document.getElementById('class_time_start').value,
        class_time_end: document.getElementById('class_time_end').value,
        days: []
    };

    // Get selected days
    ['monday', 'tuesday', /* other weekdays */].forEach(day => {
        if (document.getElementById(day).checked) {
            course.days.push(document.getElementById(day).value);
        }
    });

    // Generate iCalendar file
    generateICalendarFile(course);
});

function generateICalendarFile(course) {
    // Construct the iCalendar content
    // You will need to write this function to format the data correctly
    // according to the iCalendar format (RFC 5545)
    
    let icalendarContent = createICalendarContent(course);
    
    // Create a blob from the iCalendar content
    let blob = new Blob([icalendarContent], {type: 'text/calendar'});
    
    // Create a download link and trigger the download
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'course_schedule.ics';
    link.click();
}

function createICalendarContent(course) {
    // This function should return a string formatted as an iCalendar file
    // based on the course information

    // Example:
    let content = 'BEGIN:VCALENDAR\nVERSION:2.0\n';
    content += 'BEGIN:VEVENT\n';
    content += 'SUMMARY:' + course.name + '\n';
    // Add other iCalendar fields
    content += 'END:VEVENT\n';
    content += 'END:VCALENDAR';
    return content;
}
