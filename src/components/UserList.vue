<template>
  <div class="user-list">
    <user-summary-card
      v-for="user in filteredUsers"
      :key="user.login.uuid"
      :user="user"
      @user-selected="$emit('user-selected', $event)"
    />
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
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

    const errorMessage = ref('');

    const filteredUsers = computed(() => store.getters.filteredUsers);

    // Check if the user has scrolled to the bottom of the page
    const onScroll = ref(async () => {
      const bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        try {
          await store.dispatch('FETCH_USERS');
        } catch (error) {
          console.error('Failed to fetch users:', error);
          errorMessage.value = 'Failed to fetch users. Please try again later.';
        }
      }
    });

    onMounted(async () => {
      // Add scroll event listener on component mount
      window.addEventListener('scroll', onScroll.value);
      // Fetch initial users on component mount
      try {
        await store.dispatch('FETCH_USERS');
      } catch (error) {
        console.error('Failed to fetch users:', error);
        errorMessage.value = 'Failed to fetch users. Please try again later.';
      }
    });

    onUnmounted(() => {
      // Remove scroll event listener before component unmount
      window.removeEventListener('scroll', onScroll.value);
    });

    // Emit the 'user-selected' event with the selected user as payload
    const userSelected = (user: User) => {
      emit('user-selected', user);
    };

    return { errorMessage, filteredUsers, userSelected };
  }
});
</script>

<style scoped>
.user-list {
  width: 100%;
  height: 100vh;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media screen and (max-width: 600px) {
  .more-results-button {
    padding: 0.8rem;
    font-size: 1rem;
    width: 100%;
  }
}
</style>
