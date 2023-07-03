<template>
  <div class="app-container">
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div class="user-list" :style="userListStyle">
      <search-bar
        class="search-bar"
        @update-search="updateSearch"
        @update-gender="updateGender"
      />
      <user-list
        @user-selected="showUserDetails"
        :search="searchQuery"
        :gender="gender"
      />
    </div>
    <div class="user-details-container">
      <user-detail-modal
        v-if="selectedUser"
        :user="selectedUser"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';

import { User } from '@/types';

import SearchBar from '@/components/SearchBar.vue';
import UserDetailModal from '@/components/UserDetailModal.vue';
import UserList from '@/components/UserList.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar,
    UserDetailModal,
    UserList
  },
  setup() {
    const store = useStore();
    const selectedUser = computed(
      () => store.state.selectedUser as User | null
    );

    // Search query and gender are taken from the Vuex store and can be set by committing mutations
    const searchQuery = computed({
      get: () => store.state.searchQuery || '',
      set: (value) => store.commit('setSearchQuery', value)
    });

    const gender = computed({
      get: () => store.state.gender,
      set: (value) => store.commit('setGender', value)
    });

    const windowWidth = ref(window.innerWidth);

    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    const errorMessage = ref('');

    onMounted(async () => {
      window.addEventListener('resize', updateWindowWidth);
      try {
        await store.dispatch('FETCH_USERS');
      } catch (error) {
        console.error('Failed to fetch users:', error);
        errorMessage.value = 'Failed to fetch users. Please try again later.';
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });

    // The width of the user list depends on the window width and whether a user is selected
    const userListStyle = computed(() => {
      if (windowWidth.value >= 1280 && selectedUser.value) {
        return { width: '40%' };
      } else {
        return { width: '100%' };
      }
    });

    const updateSearch = (value: string) => {
      store.commit('setSearchQuery', value);
    };

    const updateGender = (value: string) => {
      store.commit('setGender', value);
    };

    // When a user is selected, it's set in the Vuex store
    const showUserDetails = (user: User) => {
      store.commit('setSelectedUser', user);
    };

    // Clear the selected user in the Vuex store when the modal is closed
    const closeModal = () => {
      store.commit('clearSelectedUser');
    };

    return {
      selectedUser,
      searchQuery,
      gender,
      userListStyle,
      errorMessage,
      updateSearch,
      updateGender,
      showUserDetails,
      closeModal
    };
  }
});
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100%;
}
.user-list {
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-details-container {
  overflow: hidden;
}
.error-message {
  color: red;
  font-weight: bold;
  margin: 10px 0;
}
</style>
