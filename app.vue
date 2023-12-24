<template>
  <div id="app">
    
    <div class="container">
      <!-- File Upload Box -->
      <div class="file-upload">
      <input type="file" @change="onFileChange">
      </div>
      <!-- Courses List Box -->
      <div class="courses-list-box">
        <h2>Available Courses</h2>
        <select v-model="selectedCourse" @change="addCourse">
          <option disabled value="">Select a course</option>
          <option v-for="course in availableCourses" :key="course.crn" :value="course">
            {{ course.title }} - {{ course.time }} - {{ course.instructor }}
          </option>
        </select>
      </div>

      <!-- Selected Courses Box -->
      <div class="selected-courses-box">
        <h2>Selected Courses</h2>
        <ul>
          <li v-for="course in selectedCourses" :key="course.crn">
            {{ course.title }} - {{ course.time }} - {{ course.instructor }}
            <button @click="deleteCourse(course)">Delete</button>
          </li>
        </ul>
      </div>

      <!-- Summary Window -->
      <div class="summary-window">
        <h2>Weekly Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Course</th>
              <th>Instructor</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in selectedCourses" :key="course.crn">
              <td>{{ course.days }}</td>
              <td>{{ course.time }}</td>
              <td>{{ course.title }}</td>
              <td>{{ course.instructor }}</td>
              <td>{{ course.location }}</td>
            </tr>
          </tbody>
        </table>
      </div>


      <!-- Global Settings -->
      <div class="global-settings">
        <h2>Global Settings</h2>
        <div>
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="globalStartDate">
        </div>
        <div>
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="globalEndDate">
        </div>
      </div>

      <!-- iCalendar File Generation -->
      <div class="ical-generation">
        <button @click="generateICalFile">Generate iCalendar File</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      courses: [], // All courses loaded from the JSON file
      selectedCourse: "", // Currently selected course
      selectedCourses: [], // List of courses added by the user
      globalStartDate: null, // Global start date for courses
      globalEndDate: null    // Global end date for courses
    };
  },
  computed: {
    availableCourses() {
      // Compute available courses that are not yet selected
      return this.courses.filter(course => !this.selectedCourses.includes(course));
    }
  },
  methods: {
  addCourse() {
    // Add the selected course to the selectedCourses array
    if (this.selectedCourse) {
      this.selectedCourses.push(this.selectedCourse);
      this.selectedCourse = ""; // Reset the selected course
    }
  },
    onFileChange(event) {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          this.courses = this.parseCourses(json);
        } catch (err) {
          alert("Error reading or parsing file");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
  },
  parseCourses(json) {
    // Implement logic to parse and structure the courses from the JSON
    // This depends on the specific format of your JSON file
    return json; // Replace with actual parsing logic
  },
  deleteCourse(course) {
    // Remove the course from the selectedCourses array
    const index = this.selectedCourses.indexOf(course);
    if (index > -1) {
      this.selectedCourses.splice(index, 1);
    }
  },
  methods: {
  // Generate .ical file
  generateICalFile() {
    let icalData = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your Organization//Your App//EN\n';

    this.selectedCourses.forEach(course => {
      // For each course, create an iCalendar event
      icalData += 'BEGIN:VEVENT\n';
      icalData += `SUMMARY:${course.title}\n`;
      // Other iCalendar event details like DTSTART, DTEND, LOCATION go here
      // Use globalStartDate and globalEndDate to calculate these
      icalData += 'END:VEVENT\n';
    });

    icalData += 'END:VCALENDAR';

    // Download the generated iCalendar data as a .ical file
    const blob = new Blob([icalData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'schedule.ical');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  // ... other methods ...
},

  // Other methods will be added here later
},

  mounted() {
    
    // Load courses from the JSON file
    // This will be implemented later
  }
};
</script>

<style>
/* Basic styling - will be enhanced later */
.container {
  width: 80%;
  margin: auto;
}
.courses-list-box {
  margin-bottom: 20px;
}
</style>
