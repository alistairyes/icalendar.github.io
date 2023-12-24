<template>
  <div id="app">
    <EventForm @new-event="addEvent" />
    <EventList :events="events" />
  </div>
</template>

<script>
import EventForm from './EventForm.vue';
import EventList from './EventList.vue';

export default {
  components: {
    EventForm,
    EventList
  },
  data() {
    return {
      events: []
    };
  },
  methods: {
    addEvent(event) {
      this.events.push({...event, id: Date.now() });
    }
  }
};
</script>
