<template>
  <div class="app-container">
    <div class="user-list" :style="userListStyle">
      <!-- <div class="user-list"> -->
      <search-bar class="search-bar" @update-search="updateSearch" @update-gender="updateGender" />
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
    'user-detail-modal': UserDetailModal,
    UserList
  },
  setup() {
    const store = useStore();
    const selectedUser = computed(
      () => store.state.selectedUser as User | null
    );

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

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
      store.dispatch('fetchUsers');
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });

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

    const showUserDetails = (user: User) => {
      store.commit('setSelectedUser', user);
    };

    const closeModal = () => {
      store.commit('clearSelectedUser');
    };

    return {
      selectedUser,
      searchQuery,
      gender,
      userListStyle,
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
</style>
