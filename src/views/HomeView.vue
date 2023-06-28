<template>
  <div class="app-container">
    <div class="user-list" :style="userListStyle">
    <search-bar
      @update-search="updateSearch"
      @update-gender="updateGender"
    />
    <user-list 
      @user-selected="showUserDetails"
      :search="search"
      :gender="gender"
    />
    </div>
    <div class="user-details-container">
      <user-details v-if="selectedUser" :user="selectedUser" @close="closeModal"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SearchBar from '../components/SearchBar.vue';
import UserDetails from '../components/UserDetails.vue';
import UserList from '../components/UserList.vue';
import { User } from '../types';

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar, 
    UserDetails,
    UserList
  },
  setup() {
    const store = useStore();
    const selectedUser = computed(() => store.state.selectedUser as User | null);

    const search = computed({
      get: () => store.state.searchQuery,
      set: (value) => store.commit('setSearchQuery', value)
    });
    const gender = computed(() => store.state.gender);

    onMounted(async () => {
      store.dispatch('fetchUsers');
    });

    const showUserDetails = (user: User) => {
      store.commit('setSelectedUser', user);
    };

    const updateSearch = (value: string) => {
      store.commit('setSearchQuery', value);
    };

    const updateGender = (value: string) => {
      store.commit('setGender', value);
    };

    const closeModal = () => {
      store.commit('clearSelectedUser');
    };

    const userListStyle = computed(() => {
      if (window.innerWidth >= 1280 && selectedUser.value) {
        return { width: '40%' };
      } else {
        return { width: '100%' };
      }
    });

    return {
      selectedUser,
      search,
      gender,
      updateSearch,
      updateGender,
      showUserDetails,
      closeModal,
      userListStyle
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
}

 .user-details-container {
  overflow: hidden;
} 

</style>