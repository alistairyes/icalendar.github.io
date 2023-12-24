<template>
  <div>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.title }} - {{ event.startDate }} to {{ event.endDate }}
      </li>
    </ul>
    <button @click="generateICS">Generate ICS File</button>
  </div>
</template>

<script>
export default {
  props: ['events'],
  methods: {
    generateICS() {
      // Implement logic to generate ICS file from events
    }
  }
};
</script>
