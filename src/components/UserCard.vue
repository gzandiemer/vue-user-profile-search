<template>
  <div>
    <router-link :to="`/user/${user.login.uuid}`">
      <img
        :src="user.picture.thumbnail"
        alt="User picture"
      >
      <h2>{{ formattedName }}</h2>
      <p>{{ user.email }}</p>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    user: {
      type: Object,
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
  }
});
</script>

<style></style>
