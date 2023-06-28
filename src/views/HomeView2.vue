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
      <user-details v-if="selectedUser" :user="selectedUser" @close="closeModal"/>
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

    // const appContainerStyle = ref({
    //   display: 'grid',
    //   'grid-template-columns': '100%',
    //   'grid-template-areas': '"userlist"'
    // });

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

    // const userListStyle = computed(() => {
    //   return {
    //     width: selectedUser.value ? '40%' : '100%',
    //   };
    // });

    const userListStyle = computed(() => {
    return {
      gridArea: selectedUser.value ? 'userlist' : 'userlist userdetails',
    };
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
  display: grid;
  grid-template-columns: 40% auto;
  grid-template-areas: "userlist"
                       "userdetails";
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.user-list { 
  grid-area: userlist;
  overflow-y: auto; 
  height: 100vh;
}

.user-details {
  grid-area: userdetails;
  height: 100vh;
  display: none;
}

@media (min-width: 768px) {
  .app-container {
    grid-template-columns: 40% 60%;
    grid-template-areas: "userlist userdetails";
  }

  .user-details {
    display: block;
  }
}
</style>