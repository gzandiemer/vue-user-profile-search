<template>
  <div>
    <img :src="user.picture.large" alt="User picture" />
    <p>{{ user.name.title }}. {{ user.name.first }} {{ user.name.last }}</p>
    <p>Address:
      {{ user.location.street.name }} {{ user.location.postcode }} {{ user.location.city }}</p>
    <p>{{ user.location.state }} - {{ user.location.country }} </p>
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phone }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const user = computed(() => store.getters.getUser(route.params.id));

    console.log(user.value);
    console.log(route.params.id);

    return {
      user
    };
  }
});
</script>
