<template>
  <div>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.title }} - {{ event.startDate }} to {{ event.endDate }}
      </li>
    </ul>
    <button @click="generateICS(events)">Generate ICS File</button>
  </div>
</template>

<script>
export default {
  props: ['events'],
  methods: {
    generateICS(events) {
      let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your App//EN\n';
      events.forEach(event => {
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `SUMMARY:${event.title}\n`;
        icsContent += `DTSTART:${this.formatDateToICS(event.startDate, event.startTime)}\n`;
        icsContent += `DTEND:${this.formatDateToICS(event.endDate, event.endTime)}\n`;
        icsContent += 'RRULE:FREQ=WEEKLY\n'; // Add logic for repetition
        icsContent += 'END:VEVENT\n';
      });
      icsContent += 'END:VCALENDAR';

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'events.ics';
      link.click();
    },
    formatDateToICS(date, time) {
      // Convert date and time to the ICS format
    }
  }
};
</script>
