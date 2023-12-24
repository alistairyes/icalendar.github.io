<template>
  <div>
    <input type="text" v-model="event.title" placeholder="Event Title" />
    <input type="time" v-model="event.startTime" placeholder="Start Time" />
    <input type="time" v-model="event.endTime" placeholder="End Time" />
    <input type="date" v-model="event.startDate" placeholder="Start Date" />
    <input type="date" v-model="event.endDate" placeholder="End Date" />
    <!-- Add fields for weekly repetition -->
    <button @click="addEvent">Add Event</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        title: '',
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
        // Add repetition data
      }
    };
  },
  methods: {
    addEvent() {
      this.$emit('new-event', this.event);
      this.event = { title: '', startTime: '', endTime: '', startDate: '', endDate: '' };
    }
  }
};
</script>
