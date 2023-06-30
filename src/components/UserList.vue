<template>
  <div class="user-list">
    <user-summary-card
      v-for="user in filteredUsers"
      :key="user.login.uuid"
      :user="user"
      @user-selected="$emit('user-selected', $event)"
    />
    <button @click="fetchUsers">More results...</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';

import { User } from '@/types';

import UserSummaryCard from '@/components/UserSummaryCard.vue';

export default defineComponent({
  name: 'UserList',
  components: { UserSummaryCard },
  setup(_, { emit }) {
    const store = useStore();

    const fetchUsers = async () => {
      await store.dispatch('fetchUsers');
    };

    const filteredUsers = computed(() => store.getters.filteredUsers);

    const onScroll = ref(() => {
      const bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        store.dispatch('fetchUsers');
      }
    });

    onMounted(() => {
      // Add scroll event listener on component mount
      window.addEventListener('scroll', onScroll.value);
      // Fetch initial users on component mount
      store.dispatch('fetchUsers');
    });

    onUnmounted(() => {
      // Remove scroll event listener before component unmount
      window.removeEventListener('scroll', onScroll.value);
    });

    const userSelected = (user: User) => {
      emit('user-selected', user);
    };

    return { fetchUsers, filteredUsers, userSelected };
  }
});
</script>

<style scoped>
.user-list {
  width: 100%;
  height: 100vh;
}

button {
  display: block;
  width: 90%;
  padding: 1rem;
  margin: 2rem auto;
  color: #fff;
  background-color: #f18a19;
  border: none;
  border-radius: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d16a00;
}

@media screen and (max-width: 600px) {
  button {
    padding: 0.8rem;
    font-size: 1rem;
  }
}
</style>
