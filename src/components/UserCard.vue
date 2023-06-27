<template>
  <div @click="selectUser" class="user-card">
      <img
        class="user-picture"
        :src="user.picture.thumbnail"
        alt="User picture"
      >
      <div class="user-info">
        <h2>{{ formattedName }}</h2>
        <p>{{ user.email }}</p>
      </div>
      
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '../types';

export default defineComponent({
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },
  computed: {
    formattedName() {
      const first =
        this.user.name.first.charAt(0).toUpperCase() +
        this.user.name.first.slice(1);
      const last =
        this.user.name.last.charAt(0).toUpperCase() +
        this.user.name.last.slice(1);
      return `${first} ${last}`;
    }
  },
  methods: {
    selectUser() {
      this.$emit('user-selected', this.user); // Emit custom event with user as payload
    }
  }
});
</script>

<style scoped>
.user-card {
  cursor: pointer;
  background-color: #f0f0f0; /* Change as per your preference */
  border: 1px solid #d0d0d0; /* Change as per your preference */
  border-radius: 5px; /* Change as per your preference */
  padding: 10px; /* Change as per your preference */
  margin-bottom: 10px; /* Change as per your preference */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Change as per your preference */
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
}

.user-picture {
  border-radius: 50%; /* This will make the image round */
  width: 60px; /* Adjust as per your preference */
  height: 60px; /* Adjust as per your preference */
  object-fit: cover; /* Ensures the image maintains aspect ratio */
  margin-left: 10px;
}

.user-info {
  flex: 1; /* Allows text to take remaining horizontal space */
}
</style>
