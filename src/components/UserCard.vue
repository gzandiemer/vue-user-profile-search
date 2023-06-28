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
  width: 90%;
  margin: 1rem auto;
  cursor: pointer;
  background-color: #f0f0f0; /* #f0f0f0 C*/
  border: 1px solid #d0d0d0; 
  border-radius: 5px; 
  padding: 10px; 
  margin-bottom: 10px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); 
  display: flex; 
  align-items: center; 
}

.user-picture {
  border-radius: 50%; 
  border: 1px solid #F18A19;
  width: 60px; 
  height: 60px; 
  object-fit: cover; 
  margin-left: 5%;
}

.user-info {
  flex: 1; 
}
</style>
