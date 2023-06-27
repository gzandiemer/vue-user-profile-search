<template>
  <div>
    <user-card
      v-for="user in filteredUsers"
      :key="user.login.uuid"
      :user="user"
    />
    <button @click="fetchUsers">
      More results...
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import UserCard from '../components/UserCard.vue';
import { User } from '../types';

export default defineComponent({
  name: 'UserList',
  components: { UserCard },
  props: {
    search: String,
    gender: String
  },
  setup(props) {
    const store = useStore();

    const fetchUsers = async () => {
      await store.dispatch('fetchUsers');
    };

    const users = computed(() => store.state.users as User[]);

    const filteredUsers = computed(() => {
      return users.value.filter((user: User) => {
        const searchString = props.search ? props.search.toLowerCase() : '';
        const nameMatch = `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchString);
        const genderMatch = props.gender === '' || user.gender === props.gender;
        return nameMatch && genderMatch;
      });
    });
    onMounted(async () => {
      // Add scroll event listener on component mount
      window.addEventListener('scroll', handleScroll);
      // Fetch initial users on component mount
      await fetchUsers();
    });

    onUnmounted(() => {
      // Remove scroll event listener before component unmount
      window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
      // Check if user has scrolled to the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Load more users
        fetchUsers();
      }
    }

    return { fetchUsers, users, filteredUsers };
  }
});
</script>

<style scoped></style>
